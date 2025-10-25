"""
Pydantic models for API request/response schemas.
"""
from typing import List, Optional, Dict
from pydantic import BaseModel, Field, field_validator


class ClassicalMCRequest(BaseModel):
    """Request schema for classical Monte Carlo simulation."""

    # Portfolio parameters
    w1: float = Field(default=0.5, description="Weight of asset 1", ge=0, le=1)
    w2: float = Field(default=0.5, description="Weight of asset 2", ge=0, le=1)
    strike: float = Field(default=100.0, description="Strike price K", gt=0)

    # Asset parameters
    s0: float = Field(default=100.0, description="Initial asset price", gt=0)
    mu: float = Field(default=0.05, description="Drift rate")
    sigma: float = Field(default=0.2, description="Volatility", gt=0)
    tau: float = Field(default=1.0, description="Time to maturity (years)", gt=0)
    correlation: float = Field(default=0.0, description="Asset correlation", ge=-1, le=1)

    # Simulation parameters
    num_samples: int = Field(default=10000, description="Number of MC samples", ge=100)
    alpha: float = Field(default=0.95, description="Confidence level for PFE", gt=0, lt=1)
    seed: Optional[int] = Field(default=42, description="Random seed for reproducibility")

    @field_validator('w1', 'w2')
    @classmethod
    def weights_sum(cls, v, info):
        return v


class QuantumRequest(BaseModel):
    """Request schema for quantum amplitude estimation."""

    # Portfolio parameters (same as classical)
    w1: float = Field(default=0.5, description="Weight of asset 1", ge=0, le=1)
    w2: float = Field(default=0.5, description="Weight of asset 2", ge=0, le=1)
    strike: float = Field(default=100.0, description="Strike price K", gt=0)

    # Asset parameters
    s0: float = Field(default=100.0, description="Initial asset price", gt=0)
    mu: float = Field(default=0.05, description="Drift rate")
    sigma: float = Field(default=0.2, description="Volatility", gt=0)
    tau: float = Field(default=1.0, description="Time to maturity (years)", gt=0)
    correlation: float = Field(default=0.0, description="Asset correlation", ge=-1, le=1)

    # Quantum parameters
    num_qubits: int = Field(default=5, description="Number of qubits for discretization", ge=3, le=10)
    ae_iterations: int = Field(default=6, description="Amplitude estimation iterations", ge=2, le=15)
    alpha: float = Field(default=0.95, description="Confidence level for PFE", gt=0, lt=1)
    backend_name: str = Field(default="aer_simulator", description="Qiskit backend")
    seed: Optional[int] = Field(default=42, description="Random seed")


class BenchmarkRequest(BaseModel):
    """Request schema for convergence benchmarking."""

    # Portfolio parameters
    w1: float = Field(default=0.5, ge=0, le=1)
    w2: float = Field(default=0.5, ge=0, le=1)
    strike: float = Field(default=100.0, gt=0)
    s0: float = Field(default=100.0, gt=0)
    mu: float = Field(default=0.05)
    sigma: float = Field(default=0.2, gt=0)
    tau: float = Field(default=1.0, gt=0)
    alpha: float = Field(default=0.95, gt=0, lt=1)

    # Benchmark parameters
    sample_sizes: List[int] = Field(
        default=[1000, 3000, 10000, 30000, 100000],
        description="Sample sizes for convergence analysis"
    )
    reference_samples: int = Field(
        default=1000000,
        description="Large sample size for reference PFE"
    )
    seed: Optional[int] = Field(default=42)


class ClassicalMCResponse(BaseModel):
    """Response schema for classical Monte Carlo results."""

    # Results
    expected_exposure: float = Field(description="Expected Exposure E[E]")
    pfe: float = Field(description=f"Potential Future Exposure at confidence level")
    alpha: float = Field(description="Confidence level used")

    # Diagnostics
    sample_mean: float = Field(description="Mean of exposures")
    sample_std: float = Field(description="Standard deviation of exposures")
    runtime_ms: float = Field(description="Computation time in milliseconds")
    samples_used: int = Field(description="Effective samples (considering antithetic)")

    # Parameters
    variance_reduction: str = Field(default="antithetic", description="Variance reduction method used")
    seed: Optional[int] = Field(description="Random seed used")


class QuantumResponse(BaseModel):
    """Response schema for quantum results."""

    # Results
    pfe: float = Field(description="Potential Future Exposure from QAE")
    expected_exposure: Optional[float] = Field(None, description="Expected Exposure (if computed)")
    alpha: float = Field(description="Confidence level used")

    # Quantum diagnostics
    num_qubits: int = Field(description="Number of qubits used")
    ae_iterations: int = Field(description="AE iterations performed")
    backend: str = Field(description="Quantum backend used")
    discretization_bins: int = Field(description="Number of discretization bins")

    # Performance
    runtime_ms: float = Field(description="Total computation time in milliseconds")
    circuit_depth: Optional[int] = Field(None, description="Quantum circuit depth")
    seed: Optional[int] = Field(description="Random seed used")


class BenchmarkResponse(BaseModel):
    """Response schema for convergence benchmark."""

    # Reference value
    reference_pfe: float = Field(description="High-sample reference PFE")
    reference_samples: int = Field(description="Samples used for reference")

    # Convergence data
    sample_sizes: List[int] = Field(description="Sample sizes tested")
    pfe_values: List[float] = Field(description="PFE at each sample size")
    errors: List[float] = Field(description="Absolute error vs reference")
    runtimes_ms: List[float] = Field(description="Runtime for each sample size")

    # Summary statistics
    convergence_rate: str = Field(description="Theoretical convergence rate")
    total_runtime_ms: float = Field(description="Total benchmarking time")


class HealthResponse(BaseModel):
    """Health check response."""
    status: str = Field(description="Service status")
    version: str = Field(description="API version")
    qiskit_available: bool = Field(description="Whether Qiskit is available")
