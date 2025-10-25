# QHack | Quantum Risk Engine

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

## 📚 References

1. [Quantum Amplitude Estimation Tutorial](https://qiskit-community.github.io/qiskit-finance/tutorials/00_amplitude_estimation.html)
2. [Option Pricing using Quantum Computers](https://arxiv.org/pdf/1905.02666)
3. [Risk Analysis using Quantum Computers](https://www.nature.com/articles/s41534-019-0130-6)
4. [Basel III/IV Counterparty Credit Risk](https://www.bis.org/bcbs/publ/d424.htm)
5. [UN SDG 8: Decent Work & Economic Growth](https://sdgs.un.org/goals/goal8)

</div>
