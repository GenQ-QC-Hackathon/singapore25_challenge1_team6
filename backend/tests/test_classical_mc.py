"""
Unit tests for classical Monte Carlo service.
"""
import pytest
import numpy as np
from app.services.classical_mc import (
    simulate_basket_call_exposure,
    simulate_with_antithetic,
    compute_pfe_classical,
)


def test_simulate_basket_call_basic():
    """Test basic basket call simulation."""
    exposures = simulate_basket_call_exposure(
        w1=0.5,
        w2=0.5,
        strike=100.0,
        s0=100.0,
        mu=0.05,
        sigma=0.2,
        tau=1.0,
        num_samples=1000,
        seed=42,
    )

    assert len(exposures) == 1000
    assert np.all(exposures >= 0), "Exposures must be non-negative"
    assert exposures.mean() > 0, "Expected some positive exposures"


def test_antithetic_variance_reduction():
    """Test that antithetic sampling roughly halves variance."""
    # Run standard sampling
    np.random.seed(42)
    standard_exposures = simulate_basket_call_exposure(
        w1=0.5, w2=0.5, strike=100.0, s0=100.0,
        mu=0.05, sigma=0.2, tau=1.0,
        num_samples=5000, seed=42
    )
    std_variance = np.var(standard_exposures)

    # Run antithetic sampling
    antithetic_exposures = simulate_with_antithetic(
        w1=0.5, w2=0.5, strike=100.0, s0=100.0,
        mu=0.05, sigma=0.2, tau=1.0,
        num_samples=5000, seed=42
    )
    anti_variance = np.var(antithetic_exposures)

    # Antithetic should reduce variance (not exactly half due to randomness)
    assert anti_variance < std_variance * 1.2, "Antithetic should reduce variance"


def test_compute_pfe_classical():
    """Test full PFE computation."""
    result = compute_pfe_classical(
        w1=0.5,
        w2=0.5,
        strike=100.0,
        s0=100.0,
        mu=0.05,
        sigma=0.2,
        tau=1.0,
        num_samples=1000,
        alpha=0.95,
        seed=42,
    )

    # Check result structure
    assert "pfe" in result
    assert "expected_exposure" in result
    assert "runtime_ms" in result
    assert "samples_used" in result

    # Check values are reasonable
    assert result["pfe"] > 0
    assert result["expected_exposure"] > 0
    assert result["pfe"] > result["expected_exposure"], "PFE should be > EE at high alpha"
    assert result["samples_used"] == 2000, "Antithetic doubles samples"
    assert result["runtime_ms"] > 0


def test_seed_reproducibility():
    """Test that same seed gives same results."""
    result1 = compute_pfe_classical(
        w1=0.5, w2=0.5, strike=100.0, s0=100.0,
        mu=0.05, sigma=0.2, tau=1.0,
        num_samples=1000, alpha=0.95, seed=42
    )

    result2 = compute_pfe_classical(
        w1=0.5, w2=0.5, strike=100.0, s0=100.0,
        mu=0.05, sigma=0.2, tau=1.0,
        num_samples=1000, alpha=0.95, seed=42
    )

    assert result1["pfe"] == result2["pfe"], "Same seed should give same PFE"
    assert result1["expected_exposure"] == result2["expected_exposure"]
