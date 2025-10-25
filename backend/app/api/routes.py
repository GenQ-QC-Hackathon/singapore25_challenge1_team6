"""
API routes for PFE computation endpoints.
"""
import logging
from fastapi import APIRouter, HTTPException
from app.models import (
    ClassicalMCRequest,
    ClassicalMCResponse,
    QuantumRequest,
    QuantumResponse,
    BenchmarkRequest,
    BenchmarkResponse,
    HealthResponse,
)
from app.services import (
    compute_pfe_classical,
    compute_pfe_quantum,
    convergence_benchmark,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    try:
        import qiskit
        qiskit_available = True
    except ImportError:
        qiskit_available = False

    return HealthResponse(
        status="healthy",
        version="1.0.0",
        qiskit_available=qiskit_available,
    )


@router.post("/simulate/classical", response_model=ClassicalMCResponse)
async def simulate_classical(request: ClassicalMCRequest):
    """
    Run classical Monte Carlo simulation with antithetic variance reduction.

    Returns PFE and Expected Exposure for the 2-asset basket call option.
    """
    try:
        logger.info(
            f"Classical MC request: samples={request.num_samples}, "
            f"alpha={request.alpha}, seed={request.seed}"
        )

        result = compute_pfe_classical(
            w1=request.w1,
            w2=request.w2,
            strike=request.strike,
            s0=request.s0,
            mu=request.mu,
            sigma=request.sigma,
            tau=request.tau,
            num_samples=request.num_samples,
            alpha=request.alpha,
            seed=request.seed,
        )

        logger.info(
            f"Classical MC result: PFE={result['pfe']:.2f}, "
            f"EE={result['expected_exposure']:.2f}, "
            f"time={result['runtime_ms']:.1f}ms"
        )

        return ClassicalMCResponse(**result)

    except Exception as e:
        logger.error(f"Classical MC error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/simulate/quantum", response_model=QuantumResponse)
async def simulate_quantum(request: QuantumRequest):
    """
    Run quantum amplitude estimation for PFE calculation.

    Uses Iterative QAE with binary search to find the α-quantile.
    """
    try:
        logger.info(
            f"Quantum request: qubits={request.num_qubits}, "
            f"iterations={request.ae_iterations}, alpha={request.alpha}"
        )

        result = compute_pfe_quantum(
            w1=request.w1,
            w2=request.w2,
            strike=request.strike,
            s0=request.s0,
            mu=request.mu,
            sigma=request.sigma,
            tau=request.tau,
            num_qubits=request.num_qubits,
            ae_iterations=request.ae_iterations,
            alpha=request.alpha,
            backend_name=request.backend_name,
            seed=request.seed,
        )

        logger.info(
            f"Quantum result: PFE={result['pfe']:.2f}, "
            f"time={result['runtime_ms']:.1f}ms, "
            f"qubits={result['num_qubits']}"
        )

        return QuantumResponse(**result)

    except Exception as e:
        logger.error(f"Quantum error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/benchmark/convergence", response_model=BenchmarkResponse)
async def benchmark_convergence(request: BenchmarkRequest):
    """
    Benchmark classical MC convergence across different sample sizes.

    Returns convergence data for plotting error vs. samples.
    """
    try:
        logger.info(
            f"Benchmark request: sizes={request.sample_sizes}, "
            f"reference={request.reference_samples}"
        )

        result = convergence_benchmark(
            w1=request.w1,
            w2=request.w2,
            strike=request.strike,
            s0=request.s0,
            mu=request.mu,
            sigma=request.sigma,
            tau=request.tau,
            alpha=request.alpha,
            sample_sizes=request.sample_sizes,
            reference_samples=request.reference_samples,
            seed=request.seed,
        )

        logger.info(
            f"Benchmark complete: reference_pfe={result['reference_pfe']:.2f}, "
            f"total_time={result['total_runtime_ms']:.1f}ms"
        )

        return BenchmarkResponse(**result)

    except Exception as e:
        logger.error(f"Benchmark error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
