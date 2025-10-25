// Sample data for Monte Carlo simulations

export interface MonteCarloData {
  iteration: number;
  classicalPFE: number;
  quantumPFE: number;
  classicalError: number;
  quantumError: number;
  classicalTime: number;
  quantumTime: number;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  linkedin?: string;
  description: string;
}

// Generate sample Monte Carlo convergence data
export const generateMonteCarloData = (points: number = 50): MonteCarloData[] => {
  const data: MonteCarloData[] = [];

  for (let i = 1; i <= points; i++) {
    const iteration = i * 100;

    // Classical Monte Carlo converges slowly (1/sqrt(N))
    const classicalError = 100 / Math.sqrt(iteration);
    const classicalPFE = 10000 + (Math.random() - 0.5) * classicalError * 50;

    // Quantum converges faster (1/N)
    const quantumError = 5000 / iteration;
    const quantumPFE = 10000 + (Math.random() - 0.5) * quantumError * 50;

    // Time complexity (quantum has overhead initially but scales better)
    const classicalTime = iteration * 0.01;
    const quantumTime = 50 + iteration * 0.001;

    data.push({
      iteration,
      classicalPFE: Math.max(0, classicalPFE),
      quantumPFE: Math.max(0, quantumPFE),
      classicalError,
      quantumError,
      classicalTime,
      quantumTime,
    });
  }

  return data;
};

// Sample portfolio configuration
export const defaultPortfolioConfig = {
  numAssets: 5,
  volatility: 0.2,
  strikePrice: 100,
  spotPrice: 100,
  timeToMaturity: 1.0,
  riskFreeRate: 0.05,
  numSimulations: 10000,
};

// Sample system logs
export const generateSystemLogs = (): string[] => {
  return [
    '[SYSTEM] Initializing Quantum Risk Engine...',
    '[QISKIT] Loading quantum circuit backend...',
    '[CLASSICAL] Running Monte Carlo simulation with 10,000 paths',
    '[QUANTUM] Preparing amplitude estimation circuit',
    '[QUANTUM] Circuit depth: 42 gates | Qubits: 8',
    '[CLASSICAL] Simulation completed in 2.34s',
    '[QUANTUM] Running quantum job on IBM Quantum simulator',
    '[QUANTUM] Job ID: qhack-2025-abc123',
    '[QUANTUM] Estimated completion: 5.2s',
    '[ANALYSIS] Computing Potential Future Exposure (PFE)',
    '[ANALYSIS] Credit Value Adjustment (CVA) calculated',
    '[RESULTS] Quantum speedup: 2.3x faster convergence',
    '[RESULTS] Error reduction: 45% improvement over classical',
    '[SUCCESS] Risk analysis complete',
  ];
};

// Team members data
export const teamMembers: TeamMember[] = [
  {
    name: 'Saai Aravindh Raja',
    role: 'Quantum Computing Lead',
    avatar: '🧑‍💻',
    github: '#',
    linkedin: '#',
    description: 'Quantum algorithm optimization and circuit design specialist',
  },
  {
    name: 'Seow Wee Siang',
    role: 'Full-Stack Developer',
    avatar: '👨‍💻',
    github: '#',
    linkedin: '#',
    description: 'Frontend architecture and real-time data visualization',
  },
  {
    name: 'Ethan Tiew Chun Yong',
    role: 'Financial Risk Analyst',
    avatar: '📊',
    github: '#',
    linkedin: '#',
    description: 'Derivatives pricing and counterparty credit risk modeling',
  },
  {
    name: 'Jonathan Wong Yat Fong',
    role: 'Backend Engineer',
    avatar: '⚙️',
    github: '#',
    linkedin: '#',
    description: 'API development and quantum-classical integration',
  },
  {
    name: 'Aung Ye Thant Hein',
    role: 'Data Scientist',
    avatar: '📈',
    github: '#',
    linkedin: '#',
    description: 'Statistical analysis and Monte Carlo simulations',
  },
];

// Sample quantum circuit configuration
export const quantumCircuitConfig = {
  numQubits: 8,
  circuitDepth: 42,
  gateCount: 156,
  backend: 'IBM Quantum Simulator',
  shots: 8192,
};

// Performance comparison data
export const performanceMetrics = {
  classical: {
    runtime: 2.34,
    convergenceRate: '1/√N',
    errorRate: 0.15,
    scalability: 'Linear',
  },
  quantum: {
    runtime: 1.02,
    convergenceRate: '1/N',
    errorRate: 0.08,
    scalability: 'Quadratic Advantage',
  },
};

// Sample risk metrics
export const riskMetrics = {
  pfe95: 12500,
  pfe99: 18750,
  cva: 2340,
  expectedExposure: 8900,
  potentialLoss: 5600,
  confidenceLevel: 0.99,
};
