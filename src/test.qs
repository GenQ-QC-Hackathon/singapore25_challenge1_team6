import Std.Convert.*;
import Std.Diagnostics.*;
import Std.Random.*;
import Std.Math.*;
import Microsoft.Quantum.Unstable.Arithmetic.*;
import Std.Arrays.*;
import Std.Core.*;


operation QFT(qubits : Qubit[]) : Unit is Adj + Ctl {
    body (...) {
        let n = Length(qubits);
        // QFT
        for i in 0..n-1 {
            H(qubits[i]);
            for j in i+1..n-1 {
                let angle = 2.0 * PI() / (IntAsDouble(2)^ IntAsDouble(j - i + 1));
                Controlled R1([qubits[j]], (angle, qubits[i]));
            }
        }
        // Reverse Order
        for i in 0..n/2-1 {
            SWAP(qubits[i], qubits[n-i-1]);
        }
    }
    adjoint auto;
    controlled auto;
}

operation Run(n: Int) : Result[] {
    use qubits = Qubit[n];
    // Inicializar en el estado |000>

    QFT(qubits);

    Message("Measuring QFT:");
    return MResetEachZ(qubits);

}