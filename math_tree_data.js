// Mathematics Knowledge Tree data
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
  { id: 'Probability', group: 6, aliases: ['Prob'], desc: 'Random variables, distributions, expectation, variance, law of large numbers, and CLT.' },
  { id: 'Statistics', group: 6, aliases: ['Stats'], desc: 'Data, estimation, hypothesis testing, regression, and inference techniques.' },

  // Advanced core
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

window.MATH_LINKS = [
  // Core spine
  { source: 'Mathematics', target: 'Arithmetic' },
  { source: 'Arithmetic', target: 'Pre-Algebra' },
  { source: 'Pre-Algebra', target: 'Algebra I' },
  { source: 'Algebra I', target: 'Geometry' },
  { source: 'Geometry', target: 'Trigonometry' },
  { source: 'Algebra I', target: 'Discrete Mathematics' },
  { source: 'Algebra I', target: 'Algebra II' },
  { source: 'Algebra II', target: 'Pre-Calculus' },
  { source: 'Trigonometry', target: 'Pre-Calculus' },
  { source: 'Pre-Calculus', target: 'Calculus I' },
  { source: 'Calculus I', target: 'Calculus II' },
  { source: 'Calculus II', target: 'Calculus III' },
  { source: 'Calculus I', target: 'Linear Algebra' },

  // Probability/Statistics path
  { source: 'Calculus I', target: 'Probability' },
  { source: 'Probability', target: 'Statistics' },
  { source: 'Probability', target: 'Stochastic Processes' },
  { source: 'Stochastic Processes', target: 'Time Series' },

  // Analysis path
  { source: 'Calculus II', target: 'Real Analysis' },
  { source: 'Calculus III', target: 'Real Analysis' },
  { source: 'Real Analysis', target: 'Measure Theory' },
  { source: 'Measure Theory', target: 'Probability' },
  { source: 'Real Analysis', target: 'Fourier Analysis' },
  { source: 'Real Analysis', target: 'Complex Analysis' },
  { source: 'Linear Algebra', target: 'Functional Analysis' },
  { source: 'Real Analysis', target: 'Functional Analysis' },

  // Differential equations & applied
  { source: 'Calculus II', target: 'Differential Equations' },
  { source: 'Linear Algebra', target: 'Differential Equations' },
  { source: 'Differential Equations', target: 'Ordinary Differential Equations' },
  { source: 'Calculus III', target: 'Partial Differential Equations' },
  { source: 'Linear Algebra', target: 'Partial Differential Equations' },
  { source: 'Ordinary Differential Equations', target: 'Dynamical Systems' },
  { source: 'Ordinary Differential Equations', target: 'Numerical Analysis' },
  { source: 'Partial Differential Equations', target: 'Numerical Analysis' },
  { source: 'Calculus II', target: 'Optimization' },
  { source: 'Linear Algebra', target: 'Optimization' },
  { source: 'Fourier Analysis', target: 'Partial Differential Equations' },

  // Discrete and algebra
  { source: 'Discrete Mathematics', target: 'Combinatorics' },
  { source: 'Discrete Mathematics', target: 'Graph Theory' },
  { source: 'Discrete Mathematics', target: 'Number Theory' },
  { source: 'Linear Algebra', target: 'Abstract Algebra' },
  { source: 'Discrete Mathematics', target: 'Abstract Algebra' },
  { source: 'Abstract Algebra', target: 'Group Theory' },
  { source: 'Abstract Algebra', target: 'Ring Theory' },
  { source: 'Abstract Algebra', target: 'Field Theory' },
  { source: 'Field Theory', target: 'Galois Theory' },
  { source: 'Group Theory', target: 'Representation Theory' },
  { source: 'Abstract Algebra', target: 'Representation Theory' },

  // Topology & geometry
  { source: 'Set Theory', target: 'Topology' },
  { source: 'Real Analysis', target: 'Topology' },
  { source: 'Topology', target: 'Algebraic Topology' },
  { source: 'Abstract Algebra', target: 'Algebraic Topology' },
  { source: 'Topology', target: 'Algebraic Geometry' },
  { source: 'Abstract Algebra', target: 'Algebraic Geometry' },

  // Category & info
  { source: 'Abstract Algebra', target: 'Category Theory' },
  { source: 'Topology', target: 'Category Theory' },
  { source: 'Functional Analysis', target: 'Category Theory' },
  { source: 'Probability', target: 'Information Theory' },
  { source: 'Linear Algebra', target: 'Information Theory' }
];