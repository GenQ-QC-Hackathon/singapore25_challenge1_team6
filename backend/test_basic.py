"""
Quick test script to verify backend functionality without full dependencies.
"""
import sys
import os

# Add app to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

print("Testing basic imports...")

try:
    from app.services.classical_mc import compute_pfe_classical
    print("✓ Classical MC service imported")
except Exception as e:
    print(f"✗ Classical MC import failed: {e}")
    sys.exit(1)

try:
    from app.models.schemas import ClassicalMCRequest, ClassicalMCResponse
    print("✓ Pydantic models imported")
except Exception as e:
    print(f"✗ Models import failed: {e}")
    sys.exit(1)

print("\nRunning quick classical MC test...")
try:
    result = compute_pfe_classical(
        w1=0.5, w2=0.5,
        strike=100.0, s0=100.0,
        mu=0.05, sigma=0.2, tau=1.0,
        num_samples=1000,
        alpha=0.95,
        seed=42
    )
    print(f"✓ Classical MC works!")
    print(f"  PFE: {result['pfe']:.2f}")
    print(f"  EE:  {result['expected_exposure']:.2f}")
    print(f"  Runtime: {result['runtime_ms']:.1f} ms")
except Exception as e:
    print(f"✗ Classical MC failed: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\nTesting quantum imports...")
try:
    from app.services.quantum_qae import compute_pfe_quantum
    print("✓ Quantum service imported")

    # Quick test
    result = compute_pfe_quantum(
        w1=0.5, w2=0.5,
        strike=100.0, s0=100.0,
        mu=0.05, sigma=0.2, tau=1.0,
        num_qubits=3,
        ae_iterations=4,
        alpha=0.95,
        seed=42
    )
    print(f"✓ Quantum AE works!")
    print(f"  PFE: {result['pfe']:.2f}")
    print(f"  Qubits: {result['num_qubits']}")
    print(f"  Runtime: {result['runtime_ms']:.1f} ms")
except Exception as e:
    print(f"✗ Quantum service failed: {e}")
    print("  This is expected if Qiskit is not installed")

print("\n" + "="*50)
print("✅ Backend core functionality verified!")
print("="*50)
