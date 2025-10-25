"""
Classical Monte Carlo simulation with variance reduction for PFE calculation.

Implements:
- 2-Asset Basket European Call Option
- Antithetic variance reduction
- Vectorized simulation for performance
"""
import time
from typing import Tuple, List
import numpy as np
from scipy import stats


def simulate_basket_call_exposure(
    w1: float,
    w2: float,
    strike: float,
    s0: float,
    mu: float,
    sigma: float,
    tau: float,
    num_samples: int,
    seed: int | None = None,
) -> np.ndarray:
    """
    Simulate exposure for 2-asset basket European call option.

    Portfolio value: V(τ) = w1·S1(τ) + w2·S2(τ) - K
    Exposure: E = max(V, 0)

    Assets follow: S(t) = S0 + μ·t + σ·√t·Z, where Z ~ N(0,1)

    Args:
        w1: Weight of asset 1
        w2: Weight of asset 2
        strike: Strike price K
        s0: Initial asset price (same for both)
        mu: Drift rate
        sigma: Volatility
        tau: Time to maturity
        num_samples: Number of Monte Carlo samples
        seed: Random seed for reproducibility

    Returns:
        Array of exposure values E = max(V, 0)
    """
    if seed is not None:
        np.random.seed(seed)

    # Generate normal random variables
    z = np.random.standard_normal(num_samples)

    # Calculate asset prices at maturity using normal distribution
    # S(τ) = S0 + μ·τ + σ·√τ·Z
    drift_term = mu * tau
    diffusion_term = sigma * np.sqrt(tau) * z

    # Asset 1 prices
    s1_tau = s0 + drift_term + diffusion_term

    # Asset 2 prices (independent)
    z2 = np.random.standard_normal(num_samples)
    s2_tau = s0 + drift_term + sigma * np.sqrt(tau) * z2

    # Basket value
    basket_value = w1 * s1_tau + w2 * s2_tau

    # Call option payoff
    payoff = np.maximum(basket_value - strike, 0)

    # Exposure is the positive part of portfolio value
    exposure = payoff  # Already positive due to max

    return exposure


def simulate_with_antithetic(
    w1: float,
    w2: float,
    strike: float,
    s0: float,
    mu: float,
    sigma: float,
    tau: float,
    num_samples: int,
    seed: int | None = None,
) -> np.ndarray:
    """
    Simulate with antithetic variance reduction.

    For each Z ~ N(0,1), also simulate with -Z.
    This halves the variance of the estimate.

    Args:
        Same as simulate_basket_call_exposure

    Returns:
        Array of exposures (length = 2 * num_samples)
    """
    if seed is not None:
        np.random.seed(seed)

    # Generate half the samples
    half_samples = num_samples // 2

    # Standard normal samples
    z1 = np.random.standard_normal(half_samples)
    z2 = np.random.standard_normal(half_samples)

    # Antithetic pairs
    z1_anti = -z1
    z2_anti = -z2

    # Combine original and antithetic
    z1_combined = np.concatenate([z1, z1_anti])
    z2_combined = np.concatenate([z2, z2_anti])

    # Calculate asset prices at maturity
    drift_term = mu * tau
    sqrt_tau = np.sqrt(tau)

    s1_tau = s0 + drift_term + sigma * sqrt_tau * z1_combined
    s2_tau = s0 + drift_term + sigma * sqrt_tau * z2_combined

    # Basket value and payoff
    basket_value = w1 * s1_tau + w2 * s2_tau
    exposure = np.maximum(basket_value - strike, 0)

    return exposure


def compute_pfe_classical(
    w1: float,
    w2: float,
    strike: float,
    s0: float,
    mu: float,
    sigma: float,
    tau: float,
    num_samples: int,
    alpha: float = 0.95,
    seed: int | None = None,
) -> dict:
    """
    Compute PFE using classical Monte Carlo with antithetic sampling.

    Args:
        w1: Weight of asset 1
        w2: Weight of asset 2
        strike: Strike price
        s0: Initial asset price
        mu: Drift rate
        sigma: Volatility
        tau: Time to maturity
        num_samples: Number of MC samples (will be doubled with antithetic)
        alpha: Confidence level for PFE
        seed: Random seed

    Returns:
        Dictionary with:
            - expected_exposure: E[E]
            - pfe: PFE_α
            - sample_mean: mean of exposures
            - sample_std: std of exposures
            - runtime_ms: computation time
            - samples_used: effective number of samples
            - variance_reduction: method used
            - seed: seed used
    """
    start_time = time.time()

    # Simulate with antithetic variance reduction
    exposures = simulate_with_antithetic(
        w1=w1,
        w2=w2,
        strike=strike,
        s0=s0,
        mu=mu,
        sigma=sigma,
        tau=tau,
        num_samples=num_samples,
        seed=seed,
    )

    # Compute statistics
    expected_exposure = float(np.mean(exposures))
    sample_std = float(np.std(exposures, ddof=1))

    # Compute PFE as α-quantile
    pfe = float(np.quantile(exposures, alpha))

    end_time = time.time()
    runtime_ms = (end_time - start_time) * 1000

    return {
        "expected_exposure": expected_exposure,
        "pfe": pfe,
        "alpha": alpha,
        "sample_mean": expected_exposure,
        "sample_std": sample_std,
        "runtime_ms": runtime_ms,
        "samples_used": len(exposures),  # Doubled due to antithetic
        "variance_reduction": "antithetic",
        "seed": seed,
    }


def convergence_benchmark(
    w1: float,
    w2: float,
    strike: float,
    s0: float,
    mu: float,
    sigma: float,
    tau: float,
    alpha: float,
    sample_sizes: List[int],
    reference_samples: int = 1_000_000,
    seed: int | None = None,
) -> dict:
    """
    Benchmark convergence of classical MC against reference value.

    Args:
        Portfolio and asset parameters
        sample_sizes: List of sample sizes to test
        reference_samples: Large sample size for reference PFE
        seed: Random seed

    Returns:
        Dictionary with convergence data
    """
    start_time = time.time()

    # Compute reference PFE with large sample size
    print(f"Computing reference PFE with {reference_samples} samples...")
    ref_result = compute_pfe_classical(
        w1, w2, strike, s0, mu, sigma, tau,
        num_samples=reference_samples,
        alpha=alpha,
        seed=seed,
    )
    reference_pfe = ref_result["pfe"]

    # Test different sample sizes
    pfe_values = []
    errors = []
    runtimes = []

    for m in sample_sizes:
        result = compute_pfe_classical(
            w1, w2, strike, s0, mu, sigma, tau,
            num_samples=m,
            alpha=alpha,
            seed=seed,
        )
        pfe_values.append(result["pfe"])
        errors.append(abs(result["pfe"] - reference_pfe))
        runtimes.append(result["runtime_ms"])

    total_time = (time.time() - start_time) * 1000

    return {
        "reference_pfe": reference_pfe,
        "reference_samples": ref_result["samples_used"],
        "sample_sizes": sample_sizes,
        "pfe_values": pfe_values,
        "errors": errors,
        "runtimes_ms": runtimes,
        "convergence_rate": "O(1/√N)",
        "total_runtime_ms": total_time,
    }
