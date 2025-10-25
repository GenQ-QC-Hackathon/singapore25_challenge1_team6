"""
Main FastAPI application for QHack Quantum Risk Engine.

Provides endpoints for:
- Classical Monte Carlo PFE calculation
- Quantum Amplitude Estimation PFE calculation
- Convergence benchmarking
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router

# Create FastAPI app
app = FastAPI(
    title="QHack Quantum Risk Engine API",
    description="Quantum-enhanced PFE calculation for counterparty credit risk",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(router, prefix="/api", tags=["PFE Computation"])


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "QHack Quantum Risk Engine API",
        "version": "1.0.0",
        "docs": "/docs",
        "team": "Team QHackers",
        "challenge": "GenQ Hackathon 2025 - DBS Counterparty Credit Risk"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
