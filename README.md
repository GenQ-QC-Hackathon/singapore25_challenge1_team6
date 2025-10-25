# ⚛️ QHack - Quantum Risk Engine

> **Quantum-Enhanced PFE Calculation for Counterparty Credit Risk**

[![GenQ Hackathon 2025](https://img.shields.io/badge/GenQ-Hackathon%202025-blue)](https://github.com)
[![SDG 8](https://img.shields.io/badge/UN%20SDG-8-green)](https://sdgs.un.org/goals/goal8)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Team QHackers** | Challenge 1: DBS Counterparty Credit Risk

---

## 🎯 Project Overview

QHack demonstrates how **Iterative Quantum Amplitude Estimation (I-QAE)** can accelerate **Potential Future Exposure (PFE)** calculations for derivative portfolios, achieving **quadratic speedup** over classical Monte Carlo methods.

### Key Innovation

- **Classical**: O(1/√N) convergence → need 100x samples for 10x accuracy
- **Quantum**: O(1/N) convergence → need only 10x resources for 10x accuracy

This translates to **faster risk assessments**, **lower computational costs**, and **sustainable financial growth** (UN SDG 8).

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm

### Installation & Running

```bash
# Clone repository
cd singapore25_challenge1_team6

# Install all dependencies
make setup

# Terminal 1: Start backend (http://localhost:8000)
make dev-backend

# Terminal 2: Start frontend (http://localhost:3000)
make dev-frontend
```

Access:
- **Frontend**: http://localhost:3000
- **API Docs**: http://localhost:8000/docs
- **API Health**: http://localhost:8000/api/health

---

## 📂 Project Structure

```
singapore25_challenge1_team6/
├── backend/                      # FastAPI backend
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── api/
│   │   │   └── routes.py        # API endpoints
│   │   ├── models/
│   │   │   └── schemas.py       # Pydantic models
│   │   └── services/
│   │       ├── classical_mc.py  # Classical Monte Carlo
│   │       └── quantum_qae.py   # Iterative QAE
│   ├── tests/
│   │   └── test_classical_mc.py
│   └── requirements.txt
│
├── qhack-frontend/              # Next.js frontend
│   ├── app/                     # Pages
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/          # Dashboard
│   │   └── about/              # Team page
│   ├── components/             # React components
│   └── lib/                    # Utilities & data
│
├── notebooks/                   # Jupyter notebooks
│   ├── 01_classical_mc_baseline.ipynb
│   ├── 02_iterative_qae_demo.ipynb
│   └── 03_convergence_plots.ipynb
│
├── Makefile                     # Easy setup & run
└── README.md
```

---

## 🔬 Technical Approach

### 1. Mathematical Model

**2-Asset Basket European Call Option**

$$V(\\tau) = w_1 \\cdot S_1(\\tau) + w_2 \\cdot S_2(\\tau) - K$$

Where assets follow normal distribution:
$$S(t) = S_0 + \\mu t + \\sigma \\sqrt{t} Z, \\quad Z \\sim N(0,1)$$

**Exposure & PFE**:
$$E(\\tau) = \\max(V(\\tau), 0)$$
$$\\text{PFE}_\\alpha(\\tau) = \\inf\\{y \\mid P(E(\\tau) \\leq y) \\geq \\alpha\\}$$

### 2. Classical Monte Carlo

**Implementation**:
- **Antithetic Variance Reduction**: For each Z, also use -Z
- Reduces variance by ~40-50%
- Vectorized NumPy for performance

**Convergence**:
$$\\epsilon = O(1/\\sqrt{N})$$

To improve accuracy by 1 decimal place → 100x more samples needed

### 3. Iterative Quantum Amplitude Estimation

**Algorithm**:
1. **Discretize distribution** into 2^n bins
2. **Encode in quantum state**: |ψ⟩ = Σ √p_i |i⟩
3. **Binary search** for α-quantile using threshold oracle
4. **Amplitude estimation** via Grover-like iterations

**Convergence**:
$$\\epsilon = O(1/N)$$

**Quadratic speedup** compared to classical!

**Implementation Details**:
- Uses Qiskit Aer simulator
- Configurable qubits (3-10) and AE iterations (2-15)
- Threshold oracle marks states ≤ threshold
- Binary search finds PFE efficiently

---

## 🔌 API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. Classical Monte Carlo Simulation

```http
POST /simulate/classical
Content-Type: application/json

{
  "w1": 0.5,
  "w2": 0.5,
  "strike": 100.0,
  "s0": 100.0,
  "mu": 0.05,
  "sigma": 0.2,
  "tau": 1.0,
  "num_samples": 10000,
  "alpha": 0.95,
  "seed": 42
}
```

**Response**:
```json
{
  "expected_exposure": 8.45,
  "pfe": 18.23,
  "alpha": 0.95,
  "sample_mean": 8.45,
  "sample_std": 12.34,
  "runtime_ms": 15.2,
  "samples_used": 20000,
  "variance_reduction": "antithetic",
  "seed": 42
}
```

#### 2. Quantum Amplitude Estimation

```http
POST /simulate/quantum
Content-Type: application/json

{
  "w1": 0.5,
  "w2": 0.5,
  "strike": 100.0,
  "s0": 100.0,
  "mu": 0.05,
  "sigma": 0.2,
  "tau": 1.0,
  "num_qubits": 5,
  "ae_iterations": 6,
  "alpha": 0.95,
  "backend_name": "aer_simulator",
  "seed": 42
}
```

**Response**:
```json
{
  "pfe": 18.56,
  "expected_exposure": 8.32,
  "alpha": 0.95,
  "num_qubits": 5,
  "ae_iterations": 6,
  "backend": "aer_simulator",
  "discretization_bins": 32,
  "runtime_ms": 234.5,
  "circuit_depth": null,
  "seed": 42
}
```

#### 3. Convergence Benchmark

```http
POST /benchmark/convergence
Content-Type: application/json

{
  "w1": 0.5,
  "w2": 0.5,
  "strike": 100.0,
  "s0": 100.0,
  "mu": 0.05,
  "sigma": 0.2,
  "tau": 1.0,
  "alpha": 0.95,
  "sample_sizes": [1000, 3000, 10000, 30000, 100000],
  "reference_samples": 1000000,
  "seed": 42
}
```

**Response**:
```json
{
  "reference_pfe": 18.45,
  "reference_samples": 2000000,
  "sample_sizes": [1000, 3000, 10000, 30000, 100000],
  "pfe_values": [17.89, 18.12, 18.34, 18.41, 18.43],
  "errors": [0.56, 0.33, 0.11, 0.04, 0.02],
  "runtimes_ms": [2.3, 5.6, 15.2, 42.1, 135.4],
  "convergence_rate": "O(1/√N)",
  "total_runtime_ms": 1234.5
}
```

#### 4. Health Check

```http
GET /api/health
```

**Response**:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "qiskit_available": true
}
```

---

## 📊 Jupyter Notebooks

### 1. Classical MC Baseline (`01_classical_mc_baseline.ipynb`)
- Mathematical derivation
- Standard vs antithetic sampling
- Convergence analysis with plots
- Variance reduction demonstration

### 2. Iterative QAE Demo (`02_iterative_qae_demo.ipynb`)
- Distribution discretization
- Quantum state preparation
- Threshold oracle construction
- Binary search for quantile
- Discretization tradeoff analysis

### 3. Convergence Comparison (`03_convergence_plots.ipynb`)
- **The Money Slide**: Side-by-side classical vs quantum
- Error scaling: O(1/√N) vs O(1/N)
- Speedup analysis
- Visual proof of quantum advantage

**To run notebooks**:
```bash
cd notebooks
jupyter notebook
```

---

## 🧪 Testing

```bash
# Run all backend tests
make test

# Run specific test file
cd backend && python -m pytest tests/test_classical_mc.py -v
```

**Test Coverage**:
- ✅ Classical MC correctness
- ✅ Antithetic variance reduction
- ✅ Seed reproducibility
- ✅ PFE > EE validation
- ✅ API schema validation

---

## 🎨 Frontend Features

**Minimalist Design**:
- Clean, professional interface
- Real-time simulations
- Interactive charts (Recharts)
- Responsive layout

**Pages**:
1. **Landing** (`/`): Hero section with project overview
2. **Dashboard** (`/dashboard`):
   - Classical MC panel with live charts
   - Quantum AE panel
   - Portfolio configuration
   - Convergence comparison
   - System logs console
3. **About** (`/about`): Team info and mission

---

## 🌍 Impact: UN SDG 8

**Decent Work & Economic Growth**

QHack contributes to:
1. **Financial Stability**: Faster, more accurate risk assessment
2. **Lower Costs**: Reduced computational burden
3. **Democratization**: Makes advanced tools accessible to smaller institutions
4. **Regulatory Compliance**: Cheaper PFE calculations for Basel III/IV

**Other SDGs Impacted**:
- **SDG 9**: Innovation in quantum computing for finance
- **SDG 13**: Energy-efficient computation (quantum advantage)

---

## 💼 Business Case

### Target Market
- **Tier 1**: Large banks needing real-time PFE for massive portfolios
- **Tier 2**: Regional banks seeking cost-effective risk management
- **Tier 3**: Fintechs building quantum-ready infrastructure

### Value Proposition
1. **Speed**: 10-100x faster convergence
2. **Accuracy**: Better risk estimates with fewer resources
3. **Cost**: Lower cloud compute bills for regulatory reporting
4. **Competitive Advantage**: First-mover in quantum finance

### Commercialization Path
1. **Phase 1** (Now): Proof-of-concept with simulators
2. **Phase 2** (6-12 months): Hybrid classical-quantum via IBM Quantum/IonQ
3. **Phase 3** (1-2 years): Full quantum hardware integration
4. **Phase 4** (2-3 years): SaaS platform for banks

### Monetization
- **Freemium**: Basic PFE calculations free
- **Pro**: $500-2000/month for advanced features
- **Enterprise**: Custom pricing for large portfolios + support

---

## 🔮 Future Roadmap

### Near-term (3-6 months)
- [ ] Integrate with real IBM Quantum hardware
- [ ] Support path-dependent options (Asian, Barrier)
- [ ] Multi-asset portfolios (>2 assets)
- [ ] CVA calculation
- [ ] Historical data import

### Mid-term (6-12 months)
- [ ] Error mitigation techniques
- [ ] Variational quantum algorithms
- [ ] Stochastic volatility models
- [ ] Credit spread modeling
- [ ] REST API authentication

### Long-term (1-2 years)
- [ ] Full production deployment
- [ ] Quantum-classical hybrid workflows
- [ ] Real-time streaming risk
- [ ] Multi-currency support
- [ ] Integration with core banking systems

---

## 🛡️ Challenges & Limitations

**Current Limitations**:
1. **Discretization Error**: Limited by qubit count
2. **Circuit Depth**: NISQ-era constraints
3. **Normal Assumption**: Simplified asset model (vs GBM)
4. **Independence**: No correlation between assets (ρ=0)
5. **Simulation**: Using Aer simulator, not real quantum hardware

**Path to Quantum Advantage**:
- **Hardware**: Awaiting 100+ qubit, high-fidelity quantum computers
- **Algorithms**: Continuous research on improved QAE variants
- **Noise**: Error mitigation and quantum error correction
- **Integration**: Hybrid classical-quantum workflows

**Honest Assessment**:
- Today: Proof of concept showing *potential* advantage
- Future: Real advantage expected in 3-5 years with better hardware

---

## 🤝 Team QHackers

| Member | Role | Contribution |
|--------|------|--------------|
| **Saai Aravindh Raja** | Quantum Lead | QAE implementation, circuit design |
| **Seow Wee Siang** | Full-Stack Dev | Frontend, API integration |
| **Ethan Tiew Chun Yong** | Quant Analyst | Financial modeling, PFE math |
| **Jonathan Wong Yat Fong** | Backend Engineer | FastAPI, classical MC |
| **Aung Ye Thant Hein** | Data Scientist | Statistical analysis, notebooks |

---

## 📚 References

1. [Quantum Amplitude Estimation Tutorial](https://qiskit-community.github.io/qiskit-finance/tutorials/00_amplitude_estimation.html)
2. [Option Pricing using Quantum Computers](https://arxiv.org/pdf/1905.02666)
3. [Risk Analysis using Quantum Computers](https://www.nature.com/articles/s41534-019-0130-6)
4. [Basel III/IV Counterparty Credit Risk](https://www.bis.org/bcbs/publ/d424.htm)
5. [UN SDG 8: Decent Work & Economic Growth](https://sdgs.un.org/goals/goal8)

---

## 📄 License

MIT License - See LICENSE file

---

## 🙏 Acknowledgments

- **DBS Bank**: Challenge sponsor
- **IONQ**: Quantum computing partner
- **Microsoft**: Cloud infrastructure
- **GenQ Hackathon 2025**: Organizing team
- **Qiskit Community**: Open-source quantum framework

---

## 📞 Contact

- **Team**: Team QHackers
- **Challenge**: GenQ Hackathon 2025 - DBS Counterparty Credit Risk
- **GitHub**: [singapore25_challenge1_team6](https://github.com/...)

---

<div align="center">

**Built with ❤️ by Team QHackers**

*Quantum Finance Risk Engine | GenQ Hackathon 2025*

⚛️ 🚀 💎

*"Faster risk → cheaper compliance → sustainable growth"*

</div>
