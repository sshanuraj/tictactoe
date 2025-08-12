// Mathematics Knowledge Tree data (weighted)
// Exposes global arrays: MATH_NODES, MATH_LINKS

window.MATH_NODES = [
  { id: 'Mathematics', group: 1, aliases: ['Math'], desc: 'The study of quantity, structure, space, change, and abstraction. A language for patterns.' },

  // Foundations and pre-college
  { id: 'Arithmetic', group: 2, aliases: ['Basic Arithmetic'], desc: 'Numbers and operations: addition, subtraction, multiplication, division, fractions, and decimals.' },
  { id: 'Pre-Algebra', group: 2, aliases: ['Prealgebra'], desc: 'Variables, expressions, simple equations, factors, and ratios preparing for formal algebra.' },
  { id: 'Algebra I', group: 3, aliases: ['Algebra 1', 'Intro Algebra'], desc: 'Linear equations, inequalities, functions, and basic polynomials.' },
  { id: 'Geometry', group: 3, aliases: ['Euclidean Geometry'], desc: 'Shapes, congruence, similarity, area/volume, and proofs in the plane and space.' },
  { id: 'Trigonometry', group: 4, aliases: ['Trig'], desc: 'Angles, triangles, trigonometric functions and identities, unit circle, sinusoidal graphs.' },
  { id: 'Algebra II', group: 4, aliases: ['Algebra 2', 'Intermediate Algebra'], desc: 'Quadratics, complex numbers, exponents/logs, polynomials, and rational functions.' },
  { id: 'Pre-Calculus', group: 4, aliases: ['Precalculus'], desc: 'Functions, trigonometry, sequences/series, analytic geometry, and limits basics.' },

  // Early university core
  { id: 'Calculus I', group: 5, aliases: ['Calculus 1', 'Calc I', 'Calc 1', 'Differential Calculus'], desc: 'Limits, continuity, derivatives, applications, and the Fundamental Theorem of Calculus (part I).'},
  { id: 'Calculus II', group: 5, aliases: ['Calculus 2', 'Calc II', 'Calc 2', 'Integral Calculus'], desc: 'Techniques of integration, applications, sequences and series, power series.' },
  { id: 'Calculus III', group: 5, aliases: ['Calculus 3', 'Calc III', 'Calc 3', 'Multivariable Calculus'], desc: 'Partial derivatives, multiple integrals, vector calculus, Green/Stokes/Gauss theorems.' },
  { id: 'Linear Algebra', group: 5, aliases: ['Lin Alg', 'LA'], desc: 'Vectors, matrices, linear systems, vector spaces, eigenvalues, eigenvectors, linear maps.' },
  { id: 'Discrete Mathematics', group: 5, aliases: ['Discrete Math'], desc: 'Logic, sets, functions, combinatorics, graphs, and proof techniques for discrete structures.' },
  { id: 'Set Theory', group: 5, aliases: [], desc: 'Foundations: sets, relations, functions, cardinality, and basic axioms.' },
  { id: 'Mathematical Logic', group: 5, aliases: ['Logic'], desc: 'Propositional and first-order logic, proofs, completeness, and computability basics.' },

  // Probability/statistics split
  { id: 'Probability (Intro)', group: 6, aliases: ['Probability', 'Prob'], desc: 'Elementary probability: combinatorics, random variables, expectation, common distributions, LLN/CLT (informal).' },
  { id: 'Probability (Measure-Theoretic)', group: 8, aliases: ['Advanced Probability'], desc: 'Probability via measure theory: probability spaces, random variables as measurable functions, convergence modes, martingales (intro).' },
  { id: 'Statistics', group: 6, aliases: ['Stats'], desc: 'Data, estimation, hypothesis testing, regression, and inference techniques.' },

  // Analysis and beyond
  { id: 'Real Analysis', group: 7, aliases: ['Analysis'], desc: 'Rigorous study of real numbers, sequences, continuity, differentiation, and integration.' },
  { id: 'Complex Analysis', group: 7, aliases: [], desc: 'Functions of a complex variable: analyticity, contour integration, residues, conformal maps.' },
  { id: 'Measure Theory', group: 7, aliases: [], desc: 'Sigma-algebras, measures, Lebesgue integration, convergence theorems.' },
  { id: 'Functional Analysis', group: 8, aliases: [], desc: 'Normed and Hilbert spaces, operators, spectral theory, distributions.' },
  { id: 'Fourier Analysis', group: 8, aliases: ['Harmonic Analysis (intro)'], desc: 'Fourier series and transforms, convolution, and applications to PDEs and signals.' },

  // Differential equations and applied
  { id: 'Differential Equations', group: 6, aliases: ['Diff Eq'], desc: 'Study of equations involving derivatives; qualitative and quantitative solution methods.' },
  { id: 'Ordinary Differential Equations', group: 7, aliases: ['ODE', 'ODEs'], desc: 'Differential equations in one independent variable: linear systems, phase plane, stability.' },
  { id: 'Partial Differential Equations', group: 7, aliases: ['PDE', 'PDEs'], desc: 'Equations with multiple variables: wave/heat/Laplace equations, separation, characteristics.' },
  { id: 'Numerical Analysis', group: 7, aliases: ['Scientific Computing (intro)'], desc: 'Algorithms for approximating solutions to equations, optimization, interpolation, quadrature.' },
  { id: 'Optimization', group: 7, aliases: ['Convex Optimization (intro)'], desc: 'Unconstrained and constrained optimization, convexity, Lagrange multipliers, duality.' },
  { id: 'Dynamical Systems', group: 8, aliases: [], desc: 'Qualitative behavior of iterative and differential systems: stability, chaos, bifurcations.' },

  // Discrete and algebra
  { id: 'Number Theory', group: 6, aliases: ['NT'], desc: 'Integers and primes: congruences, Diophantine equations, arithmetic functions.' },
  { id: 'Combinatorics', group: 6, aliases: [], desc: 'Counting, generating functions, recurrences, extremal methods, probabilistic method.' },
  { id: 'Graph Theory', group: 6, aliases: [], desc: 'Graphs and networks: connectivity, planarity, coloring, flows, and algorithms.' },
  { id: 'Abstract Algebra', group: 7, aliases: ['Modern Algebra'], desc: 'Groups, rings, fields, and modules; structure and homomorphisms.' },
  { id: 'Group Theory', group: 7, aliases: [], desc: 'Groups: actions, Sylow theorems, group extensions, and classification examples.' },
  { id: 'Ring Theory', group: 7, aliases: [], desc: 'Rings and modules: ideals, factorization, Noetherian properties.' },
  { id: 'Field Theory', group: 7, aliases: [], desc: 'Fields and extensions: algebraic/transcendental extensions, splitting fields.' },
  { id: 'Galois Theory', group: 8, aliases: [], desc: 'Galois groups and the solvability of polynomials via field automorphisms.' },
  { id: 'Representation Theory', group: 8, aliases: [], desc: 'Linear representations of groups and algebras; characters and decompositions.' },

  // Geometry and topology
  { id: 'Topology', group: 8, aliases: [], desc: 'Topological spaces, continuity, compactness, connectedness.' },
  { id: 'Algebraic Topology', group: 9, aliases: [], desc: 'Homotopy and homology; algebraic invariants of topological spaces.' },
  { id: 'Algebraic Geometry', group: 9, aliases: [], desc: 'Solutions to polynomial equations viewed geometrically; varieties and schemes (intro).'},

  // Category + info theory
  { id: 'Category Theory', group: 9, aliases: ['Cats'], desc: 'Objects and morphisms; functors, natural transformations, universal properties.' },
  { id: 'Information Theory', group: 7, aliases: ['Info Theory'], desc: 'Entropy, mutual information, coding theorems, and limits of compression and communication.' },
  { id: 'Stochastic Processes', group: 7, aliases: [], desc: 'Random processes over time: Markov chains, Poisson processes, martingales (intro).'},
  { id: 'Time Series', group: 7, aliases: [], desc: 'Autoregressive/moving-average models, spectral analysis, forecasting.' }
];

// weight: [0.1, 1.0], scope: 'core' | 'supporting' | 'advanced' | 'optional'
window.MATH_LINKS = [
  // Core spine
  { source: 'Mathematics', target: 'Arithmetic', weight: 1.0, scope: 'core' },
  { source: 'Arithmetic', target: 'Pre-Algebra', weight: 0.9, scope: 'core' },
  { source: 'Pre-Algebra', target: 'Algebra I', weight: 1.0, scope: 'core' },
  { source: 'Algebra I', target: 'Geometry', weight: 0.7, scope: 'supporting' },
  { source: 'Geometry', target: 'Trigonometry', weight: 0.6, scope: 'supporting' },
  { source: 'Algebra I', target: 'Discrete Mathematics', weight: 0.6, scope: 'supporting' },
  { source: 'Algebra I', target: 'Algebra II', weight: 0.9, scope: 'core' },
  { source: 'Algebra II', target: 'Pre-Calculus', weight: 0.9, scope: 'core' },
  { source: 'Trigonometry', target: 'Pre-Calculus', weight: 0.7, scope: 'supporting' },
  { source: 'Pre-Calculus', target: 'Calculus I', weight: 1.0, scope: 'core' },
  { source: 'Calculus I', target: 'Calculus II', weight: 1.0, scope: 'core' },
  { source: 'Calculus II', target: 'Calculus III', weight: 0.9, scope: 'core' },
  { source: 'Calculus I', target: 'Linear Algebra', weight: 0.4, scope: 'supporting' },

  // Probability/Statistics path (split)
  { source: 'Algebra II', target: 'Probability (Intro)', weight: 0.5, scope: 'supporting' },
  { source: 'Combinatorics', target: 'Probability (Intro)', weight: 0.6, scope: 'supporting' },
  { source: 'Calculus I', target: 'Probability (Intro)', weight: 0.6, scope: 'supporting' },
  { source: 'Real Analysis', target: 'Probability (Measure-Theoretic)', weight: 0.6, scope: 'advanced' },
  { source: 'Measure Theory', target: 'Probability (Measure-Theoretic)', weight: 0.9, scope: 'core' },
  { source: 'Probability (Intro)', target: 'Statistics', weight: 0.8, scope: 'core' },
  { source: 'Linear Algebra', target: 'Statistics', weight: 0.5, scope: 'supporting' },
  { source: 'Calculus II', target: 'Statistics', weight: 0.4, scope: 'supporting' },
  { source: 'Probability (Intro)', target: 'Stochastic Processes', weight: 0.7, scope: 'core' },
  { source: 'Probability (Measure-Theoretic)', target: 'Stochastic Processes', weight: 0.6, scope: 'advanced' },
  { source: 'Stochastic Processes', target: 'Time Series', weight: 0.7, scope: 'core' },

  // Analysis path
  { source: 'Calculus II', target: 'Real Analysis', weight: 0.8, scope: 'supporting' },
  { source: 'Calculus III', target: 'Real Analysis', weight: 0.5, scope: 'supporting' },
  { source: 'Real Analysis', target: 'Measure Theory', weight: 0.9, scope: 'core' },
  { source: 'Measure Theory', target: 'Probability (Intro)', weight: 0.2, scope: 'optional' }, // exposure helps intuition
  { source: 'Real Analysis', target: 'Fourier Analysis', weight: 0.7, scope: 'supporting' },
  { source: 'Real Analysis', target: 'Complex Analysis', weight: 0.8, scope: 'core' },
  { source: 'Linear Algebra', target: 'Functional Analysis', weight: 0.7, scope: 'supporting' },
  { source: 'Real Analysis', target: 'Functional Analysis', weight: 0.8, scope: 'core' },

  // Differential equations & applied
  { source: 'Calculus II', target: 'Differential Equations', weight: 0.8, scope: 'core' },
  { source: 'Linear Algebra', target: 'Differential Equations', weight: 0.7, scope: 'supporting' },
  { source: 'Differential Equations', target: 'Ordinary Differential Equations', weight: 1.0, scope: 'core' },
  { source: 'Calculus III', target: 'Partial Differential Equations', weight: 0.8, scope: 'core' },
  { source: 'Linear Algebra', target: 'Partial Differential Equations', weight: 0.5, scope: 'supporting' },
  { source: 'Ordinary Differential Equations', target: 'Dynamical Systems', weight: 0.8, scope: 'core' },
  { source: 'Ordinary Differential Equations', target: 'Numerical Analysis', weight: 0.6, scope: 'supporting' },
  { source: 'Partial Differential Equations', target: 'Numerical Analysis', weight: 0.6, scope: 'supporting' },
  { source: 'Calculus II', target: 'Optimization', weight: 0.6, scope: 'supporting' },
  { source: 'Linear Algebra', target: 'Optimization', weight: 0.8, scope: 'core' },
  { source: 'Fourier Analysis', target: 'Partial Differential Equations', weight: 0.6, scope: 'supporting' },

  // Discrete and algebra
  { source: 'Discrete Mathematics', target: 'Combinatorics', weight: 0.9, scope: 'core' },
  { source: 'Discrete Mathematics', target: 'Graph Theory', weight: 0.8, scope: 'core' },
  { source: 'Discrete Mathematics', target: 'Number Theory', weight: 0.6, scope: 'supporting' },
  { source: 'Linear Algebra', target: 'Abstract Algebra', weight: 0.4, scope: 'supporting' },
  { source: 'Discrete Mathematics', target: 'Abstract Algebra', weight: 0.6, scope: 'supporting' },
  { source: 'Abstract Algebra', target: 'Group Theory', weight: 0.9, scope: 'core' },
  { source: 'Abstract Algebra', target: 'Ring Theory', weight: 0.9, scope: 'core' },
  { source: 'Abstract Algebra', target: 'Field Theory', weight: 0.9, scope: 'core' },
  { source: 'Field Theory', target: 'Galois Theory', weight: 1.0, scope: 'core' },
  { source: 'Group Theory', target: 'Representation Theory', weight: 0.7, scope: 'supporting' },
  { source: 'Abstract Algebra', target: 'Representation Theory', weight: 0.6, scope: 'supporting' },

  // Topology & geometry
  { source: 'Set Theory', target: 'Topology', weight: 0.6, scope: 'supporting' },
  { source: 'Real Analysis', target: 'Topology', weight: 0.5, scope: 'supporting' },
  { source: 'Topology', target: 'Algebraic Topology', weight: 0.9, scope: 'core' },
  { source: 'Abstract Algebra', target: 'Algebraic Topology', weight: 0.6, scope: 'supporting' },
  { source: 'Topology', target: 'Algebraic Geometry', weight: 0.6, scope: 'supporting' },
  { source: 'Abstract Algebra', target: 'Algebraic Geometry', weight: 0.8, scope: 'core' },

  // Category & info
  { source: 'Abstract Algebra', target: 'Category Theory', weight: 0.7, scope: 'supporting' },
  { source: 'Topology', target: 'Category Theory', weight: 0.5, scope: 'supporting' },
  { source: 'Functional Analysis', target: 'Category Theory', weight: 0.3, scope: 'optional' },
  { source: 'Probability (Intro)', target: 'Information Theory', weight: 0.8, scope: 'core' },
  { source: 'Linear Algebra', target: 'Information Theory', weight: 0.5, scope: 'supporting' }
];