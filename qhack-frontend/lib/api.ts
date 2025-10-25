/**
 * API Client for QHack Backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface PortfolioParams {
  w1: number;
  w2: number;
  strike: number;
  s0: number;
  mu: number;
  sigma: number;
  tau: number;
  alpha: number;
  seed?: number;
}

export interface ClassicalMCParams extends PortfolioParams {
  num_samples: number;
}

export interface QuantumParams extends PortfolioParams {
  num_qubits: number;
  ae_iterations: number;
  backend_name?: string;
}

export interface ClassicalResult {
  expected_exposure: number;
  pfe: number;
  alpha: number;
  sample_mean: number;
  sample_std: number;
  runtime_ms: number;
  samples_used: number;
  variance_reduction: string;
  seed?: number;
}

export interface QuantumResult {
  pfe: number;
  expected_exposure?: number;
  alpha: number;
  num_qubits: number;
  ae_iterations: number;
  backend: string;
  discretization_bins: number;
  runtime_ms: number;
  circuit_depth?: number;
  seed?: number;
}

export interface BenchmarkResult {
  reference_pfe: number;
  reference_samples: number;
  sample_sizes: number[];
  pfe_values: number[];
  errors: number[];
  runtimes_ms: number[];
  convergence_rate: string;
  total_runtime_ms: number;
}

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async healthCheck(): Promise<{ status: string; version: string; qiskit_available: boolean }> {
    const response = await fetch(`${this.baseUrl}/api/health`);
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  }

  async simulateClassical(params: ClassicalMCParams): Promise<ClassicalResult> {
    const response = await fetch(`${this.baseUrl}/api/simulate/classical`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Classical simulation failed');
    }
    return response.json();
  }

  async simulateQuantum(params: QuantumParams): Promise<QuantumResult> {
    const response = await fetch(`${this.baseUrl}/api/simulate/quantum`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Quantum simulation failed');
    }
    return response.json();
  }

  async runBenchmark(params: {
    w1: number;
    w2: number;
    strike: number;
    s0: number;
    mu: number;
    sigma: number;
    tau: number;
    alpha: number;
    sample_sizes: number[];
    reference_samples: number;
    seed?: number;
  }): Promise<BenchmarkResult> {
    const response = await fetch(`${this.baseUrl}/api/benchmark/convergence`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Benchmark failed');
    }
    return response.json();
  }
}

export const apiClient = new APIClient();
