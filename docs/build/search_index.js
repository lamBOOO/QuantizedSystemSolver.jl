var documenterSearchIndex = {"docs":
[{"location":"userGuide/#Tutorial:","page":"Tutorial","title":"Tutorial:","text":"","category":"section"},{"location":"userGuide/#Solving-a-Nonlinear-ODE-Problem-with-NLodeProblem-in-Julia","page":"Tutorial","title":"Solving a Nonlinear ODE Problem with NLodeProblem in Julia","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"In this tutorial, we will go through the process of setting up, solving, querying, and plotting a nonlinear ordinary differential equation (ODE) problem using the NLodeProblem function. We will use a buck converter circuit model as an example.","category":"page"},{"location":"userGuide/#Step-1:-Define-the-ODE-Problem","page":"Tutorial","title":"Step 1: Define the ODE Problem","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"The first step is to define the ODE problem using the NLodeProblem function. We provide the function with user code that specifies the parameters, variables, and differential equations. Here is the example code for a buck converter circuit model with detailed explanations:","category":"page"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"odeprob = NLodeProblem(quote\n    name = (buck,) # Define the name of the problem for identification\n    \n    # Parameters\n    C = 1e-4          # Capacitance in farads\n    L = 1e-4          # Inductance in henrys\n    R = 10.0          # Resistance in ohms\n    U = 24.0          # Input voltage in volts\n    T = 1e-4          # Switching period in seconds\n    DC = 0.5          # Duty cycle\n    ROn = 1e-5        # On-state resistance of the switch in ohms\n    ROff = 1e5        # Off-state resistance of the switch in ohms\n    \n    # Discrete and continuous variables\n    discrete = [1e5, 1e-5, 1e-4, 0.0, 0.0] # Initial discrete states\n    u = [0.0, 0.0]                        # Initial continuous states\n    \n    # Rename for convenience\n    rd = discrete[1]       # Diode resistance\n    rs = discrete[2]       # Switch resistance\n    nextT = discrete[3]    # Next switching time\n    lastT = discrete[4]    # Last switching time\n    diodeon = discrete[5]  # Diode state (on/off)\n    il = u[1]              # Inductor current\n    uc = u[2]              # Capacitor voltage\n    \n    # Helper equations\n    id = (il * rs - U) / (rd + rs)  # Diode current calculation\n    \n    # Differential equations\n    du[1] = (-id * rd - uc) / L     # Derivative of inductor current\n    du[2] = (il - uc / R) / C       # Derivative of capacitor voltage\n    \n    # Events\n    if t - nextT > 0.0 \n        lastT = nextT             # Update last switching time\n        nextT = nextT + T         # Schedule next switching time\n        rs = ROn                  # Set switch to on-state\n    end\n    \n    if t - lastT - DC * T > 0.0 \n        rs = ROff                 # Set switch to off-state\n    end\n    \n    if diodeon * id + (1.0 - diodeon) * (id * rd - 0.6) > 0\n        rd = ROn                  # Diode is on\n        diodeon = 1.0\n    else\n        rd = ROff                 # Diode is off\n        diodeon = 0.0\n    end\nend)","category":"page"},{"location":"userGuide/#Explanation:","page":"Tutorial","title":"Explanation:","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"Parameters: These are constants used in the model. C, L, R, U, T, DC, ROn, ROff are physical constants related to the buck converter circuit.\nDiscrete and continuous variables: These represent the initial states of discrete and continuous variables in the model.\nRenaming variables: For convenience, the elements of discrete and u are renamed to more descriptive variable names (rd, rs, nextT, lastT, diodeon, il, uc).\nHelper equations: These are intermediate expressions needed for the differential equations. id is the current through the diode.\nDifferential equations: These represent the system's dynamics. du[1] is the rate of change of the inductor current. du[2] is the rate of change of the capacitor voltage.\nEvents: These are conditions that modify the continous and discrete variables. They handle the switching behavior of the buck converter and the diode's state transitions.","category":"page"},{"location":"userGuide/#Step-2:-Solve-the-ODE-Problem","page":"Tutorial","title":"Step 2: Solve the ODE Problem","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"Next, we solve the ODE problem using the solve function. We need to specify the problem, the algorithm, and the simulation settings.","category":"page"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"# Define the time span for the simulation\ntspan = (0.0, 0.001)  # Start at 0 seconds, end at 0.001 seconds\n# Solve the ODE problem with the chosen algorithm and settings\nsol = solve(odeprob, nmliqss2(), tspan, abstol=1e-4, reltol=1e-3)","category":"page"},{"location":"userGuide/#Explanation:-2","page":"Tutorial","title":"Explanation:","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"Time span: tspan defines the interval over which the solution is computed, from 0.0 to 0.001 seconds.\nSolver function: solve is used to compute the solution.\nodeprob is the ODE problem we defined.\nnmliqss2() specifies the algorithm used to solve the problem (e.g., qss2,nmliqss1... might be other algorithms).\nabstol and reltol are the absolute and relative tolerances for the solver, controlling the accuracy of the solution.","category":"page"},{"location":"userGuide/#Step-3:-Query-the-Solution","page":"Tutorial","title":"Step 3: Query the Solution","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"After solving the problem, we can query the solution to extract useful information such as variable values at specific times, the number of steps, events, and more.","category":"page"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"# Get the value of variable 2 at time 0.0005\nvalue_at_time = sol(2, 0.0005)\n\n# Get the total number of steps to end the simulation\ntotal_steps = sol.totalSteps\n\n# Get the number of simultaneous steps during the simulation\nsimul_step_count = sol.simulStepCount\n\n# Get the total number of events during the simulation\nevent_count = sol.evCount\n\n# Get the saved times and variables\nsaved_times = sol.savedTimes\nsaved_vars = sol.savedVars\n\n# Print the results\nprintln(\"Value of variable 2 at time 0.0005: \", value_at_time)\nprintln(\"Total number of steps: \", total_steps)\nprintln(\"Number of simultaneous steps: \", simul_step_count)\nprintln(\"Total number of events: \", event_count)","category":"page"},{"location":"userGuide/#Explanation:-3","page":"Tutorial","title":"Explanation:","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"Value of variable 2 at a specific time: sol(2, 0.0005) returns the value of the second variable (capacitor voltage uc) at time 0.0005 seconds. Total steps: sol.totalSteps gives the total number of steps taken by the solver to reach the end of the simulation.\nSimultaneous steps: sol.simulStepCount provides the number of steps where simultaneous updates occurred.\nTotal events: sol.evCount gives the total number of events (e.g., switch state changes) during the simulation.\nSaved times and variables: sol.savedTimes and sol.savedVars store the time points and corresponding variable values computed during the simulation.","category":"page"},{"location":"userGuide/#Step-4:-Plot-the-Solution","page":"Tutorial","title":"Step 4: Plot the Solution","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"Finally, we can plot the solution to visualize the results. We have two options: generate a plot object for further customization or save the plot directly to a file.","category":"page"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"# Generate a plot object\nplot_obj = getPlot(sol)\n\n# Display the plot\ndisplay(plot_obj)\n\n# Save the plot to a file\nsave_Sol(sol, \"solution_plot.png\")","category":"page"},{"location":"userGuide/#Explanation:-4","page":"Tutorial","title":"Explanation:","text":"","category":"section"},{"location":"userGuide/","page":"Tutorial","title":"Tutorial","text":"Generate plot object: getPlot(sol) creates a plot object from the solution data. Display the plot: display(plotobj) shows the plot in the current environment. Save the plot: saveSol(sol, \"solutionplot.png\") saves the plot to a file named solutionplot.png.","category":"page"},{"location":"userGuide/#[Interface-code-documentation](./interface.md#interface)","page":"Tutorial","title":"Interface code documentation","text":"","category":"section"},{"location":"userGuide/#[Algorithms](./algorithm.md#algorithms)","page":"Tutorial","title":"Algorithms","text":"","category":"section"},{"location":"interface/#Interface","page":"Interface","title":"Interface","text":"","category":"section"},{"location":"interface/","page":"Interface","title":"Interface","text":"NLodeProblem(odeExprs) ","category":"page"},{"location":"interface/#QuantizedSystemSolver.NLodeProblem-Tuple{Any}","page":"Interface","title":"QuantizedSystemSolver.NLodeProblem","text":"NLodeProblem(odeExprs) \n\nThis function parses the user code to dispatches on a specific problem construction. It returns a Problem object to be passed to the solve function.\n\n\n\n\n\n","category":"method"},{"location":"interface/","page":"Interface","title":"Interface","text":"solve(prob::NLODEProblem{PRTYPE,T,Z,D,CS},al::QSSAlgorithm{SolverType, OrderType},tspan::Tuple{Float64, Float64};sparsity::Val{Sparsity}=Val(false),saveat=1e-9::Float64,abstol=1e-4::Float64,reltol=1e-3::Float64,maxErr=Inf::Float64,maxStepsAllowed=10000000) where{PRTYPE,T,Z,D,CS,SolverType,OrderType,Sparsity}     ","category":"page"},{"location":"interface/#QuantizedSystemSolver.solve-Union{Tuple{Sparsity}, Tuple{OrderType}, Tuple{SolverType}, Tuple{CS}, Tuple{D}, Tuple{Z}, Tuple{T}, Tuple{PRTYPE}, Tuple{NLODEProblem{PRTYPE, T, Z, D, CS}, QSSAlgorithm{SolverType, OrderType}, Tuple{Float64, Float64}}} where {PRTYPE, T, Z, D, CS, SolverType, OrderType, Sparsity}","page":"Interface","title":"QuantizedSystemSolver.solve","text":"solve(prob::NLODEProblem{PRTYPE,T,Z,D,CS},al::QSSAlgorithm{SolverType, OrderType},tspan::Tuple{Float64, Float64};sparsity::Val{Sparsity}=Val(false),saveat=1e-9::Float64,abstol=1e-4::Float64,reltol=1e-3::Float64,maxErr=Inf::Float64,maxStepsAllowed=10000000) where{PRTYPE,T,Z,D,CS,SolverType,OrderType,Sparsity}  \n\nThis function dispatches on a specific integrator based on the algorithm provided. With the exception of the argument prob and tspan, all other arguments are optional and have default values.\n\n-The algorithm defaults to nmliqss2, and it is specified by the QSSAlgorithm type, which is a composite type that has a name and an order. It can be extended independently of the solver.\n\n-The sparsity argument defaults to false. If true, the integrator will use a sparse representation of the Jacobian matrix (not implemented).\n\n-The saveat argument defaults to 1e-9. It specifies the time step at which the integrator will save the solution (not implemented).\n\n-The abstol argument defaults to 1e-4. It specifies the absolute tolerance of the integrator.\n\n-The reltol argument defaults to 1e-3. It specifies the relative tolerance of the integrator.\n\n-The maxErr argument defaults to Inf. It specifies the maximum error allowed by the integrator. This is used as an upper bound for the quantum when a variable goes large.\n\n-The maxStepsAllowed argument defaults to 10000000. It specifies the maximum number of steps allowed by the integrator. If the user wants to extend the limit on the maximum number of steps, this argument can be used.\n\nAfter the simulation, the solution is returned as a Solution object.\n\n\n\n\n\n","category":"method"},{"location":"developperGuide/#Developper-Guide","page":"developper Guide","title":"Developper Guide","text":"","category":"section"},{"location":"developperGuide/","page":"developper Guide","title":"developper Guide","text":"While the package is optimized to be fast, extensibility is not compromised. It is divided into 3 modules that can be extended separately: Problem, Algorithm, and Solution. The package uses other packages such as MacroTools.jl for user-code parsing, SymEngine.jl for Jacobian computation, and a modified TaylorSeries.jl that uses caching to obtain free Taylor variables. The approximation through Taylor variables transforms any complicated equations to polynomials, which makes root finding cheaper.","category":"page"},{"location":"developperGuide/#[Problem-extension](./Problem.md#problem)","page":"developper Guide","title":"Problem extension","text":"","category":"section"},{"location":"developperGuide/#[Algorithm-extension](./algorithmDev.md#algorithm-extension)","page":"developper Guide","title":"Algorithm extension","text":"","category":"section"},{"location":"developperGuide/#[Solution-extension](./solutionDev.md#solution-extension)","page":"developper Guide","title":"Solution extension","text":"","category":"section"},{"location":"developperGuide/#[Taylor0-extension](./Taylor0.md#taylor0)","page":"developper Guide","title":"Taylor0 extension","text":"","category":"section"},{"location":"developperGuide/","page":"developper Guide","title":"developper Guide","text":"Home Quantized System Solver","category":"page"},{"location":"examples/#Examples:","page":"Examples","title":"Examples:","text":"","category":"section"},{"location":"examples/#Systems-of-2-Linear-Time-Invariant-Differential-equations","page":"Examples","title":"Systems of 2 Linear Time Invariant Differential equations","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"odeprob = NLodeProblem(quote\n     name=(sysb53,)\n    u = [-1.0, -2.0]\n    du[1] = -20.0*u[1]-80.0*u[2]+1600.0\n    du[2] =1.24*u[1]-0.01*u[2]+0.2\nend)  \ntspan=(0.0,1.0)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"sol=solve(odeprob,qss1(),tspan)\nsave_Sol(sol)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_sysb53_qss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"sol=solve(odeprob,qss2(),tspan)\nsave_Sol(sol)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_sysb53_qss2)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"sol=solve(odeprob,liqss1(),tspan)\nsave_Sol(sol)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_sysb53_liqss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"sol=solve(odeprob,liqss2(),tspan)\nsave_Sol(sol)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_sysb53_liqss2)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"sol=solve(odeprob,nmliqss1(),tspan)\nsave_Sol(sol)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_sysb53_nmliqss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"sol=solve(odeprob,nmliqss2(),tspan)\nsave_Sol(sol)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_sysb53_nmliqss2)","category":"page"},{"location":"examples/#The-Tyson-Model","page":"Examples","title":"The Tyson Model","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"function test(solvr,absTol,relTol)\nodeprob = NLodeProblem(quote\n    name=(tyson,)\n    u = [0.0,0.75,0.25,0.0,0.0,0.0]\n    du[1] = u[4]-1e6*u[1]+1e3*u[2]\n    du[2] =-200.0*u[2]*u[5]+1e6*u[1]-1e3*u[2]\n    du[3] = 200.0*u[2]*u[5]-u[3]*(0.018+180.0*(u[4]/(u[1]+u[2]+u[3]+u[4]))^2)\n    du[4] =u[3]*(0.018+180.0*(u[4]/(u[1]+u[2]+u[3]+u[4]))^2)-u[4]\n    du[5] = 0.015-200.0*u[2]*u[5]\n    du[6] =u[4]-0.6*u[6]\nend ) \nprintln(\"start tyson solving\")\ntspan=(0.0,25.0)\nsol=solve(odeprob,solvr,abstol=absTol,reltol=relTol,tspan)\nprintln(\"start saving plot\")\nsave_Sol(sol)\nend\n\nabsTol=1e-5\nrelTol=1e-2\nsolvrs=[qss1(),liqss1(),nmliqss1(),nmliqss2()]\nfor solvr in solvrs\n    test(solvr,absTol,relTol)\nend","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_tyson_qss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_tyson_liqss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_tyson_nmliqss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_tyson_nmliqss2)","category":"page"},{"location":"examples/#Oregonator;-Vanderpl;-Loktavoltera","page":"Examples","title":"Oregonator; Vanderpl; Loktavoltera","text":"","category":"section"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_oregonator_mliqss1)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_vanderpol_mliqss2)","category":"page"},{"location":"examples/","page":"Examples","title":"Examples","text":"(Image: plot_loktavoltera_mliqss3)","category":"page"},{"location":"Taylor0/#Taylor0","page":"Taylor0","title":"Taylor0","text":"","category":"section"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"Taylor0","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.Taylor0","page":"Taylor0","title":"QuantizedSystemSolver.Taylor0","text":"Taylor0 A struct that defines a Taylor Variable. It has the following fields:\n\n- coeffs: An array of Float64 that holds the coefficients of the Taylor series\n\n- order: The order of the Taylor series\n\n\n\n\n\n","category":"type"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"createT(a::T,cache::Taylor0) where {T<:Number}","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.createT-Union{Tuple{T}, Tuple{T, Taylor0}} where T<:Number","page":"Taylor0","title":"QuantizedSystemSolver.createT","text":"createT(a::T,cache::Taylor0) where {T<:Number}     creates a Taylor0 from a constant. In case of order 2, cache=[a,0,0]\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"addT(a::Taylor0, b::Taylor0,cache::Taylor0) ","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.addT-Tuple{Taylor0, Taylor0, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.addT","text":"addT(a::Taylor0, b::Taylor0,cache::Taylor0)  cache=a+b\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"subT(a::Taylor0, b::Taylor0,cache::Taylor0)","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.subT-Tuple{Taylor0, Taylor0, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.subT","text":"subT(a::Taylor0, b::Taylor0,cache::Taylor0) cache=a-b\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"mulT(a::Taylor0, b::Taylor0,cache1::Taylor0)","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.mulT-Tuple{Taylor0, Taylor0, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.mulT","text":"mulT(a::Taylor0, b::Taylor0,cache1::Taylor0)  cache1=a*b\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"divT(a::Taylor0, b::Taylor0,cache1::Taylor0) ","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.divT-Tuple{Taylor0, Taylor0, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.divT","text":"divT(a::Taylor0, b::Taylor0,cache1::Taylor0)  cache1=a/b\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"addsub(a::Taylor0, b::Taylor0,c::Taylor0,cache::Taylor0) ","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.addsub-NTuple{4, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.addsub","text":"addsub(a::Taylor0, b::Taylor0,c::Taylor0,cache::Taylor0)     cache=a+b-c\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"addsub(a::T, b::Taylor0,c::Taylor0,cache::Taylor0) where {T<:Number} ","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.addsub-Union{Tuple{T}, Tuple{T, Taylor0, Taylor0, Taylor0}} where T<:Number","page":"Taylor0","title":"QuantizedSystemSolver.addsub","text":"addsub(a::T, b::Taylor0,c::Taylor0,cache::Taylor0) where {T<:Number}    Order2 case: cache=[a+b[0]-c[0],b[1]-c[1],b[2]-c[2]]\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"negateT(a::Taylor0,cache::Taylor0)","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.negateT-Tuple{Taylor0, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.negateT","text":"negateT(a::Taylor0,cache::Taylor0) cache=-a\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"subsub(a::Taylor0, b::Taylor0,c::Taylor0,cache::Taylor0) ","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.subsub-NTuple{4, Taylor0}","page":"Taylor0","title":"QuantizedSystemSolver.subsub","text":"subsub(a::Taylor0, b::Taylor0,c::Taylor0,cache::Taylor0)  cache=a-b-c\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"muladdT(a::P,b::Q,c::R,cache1::Taylor0) where {P,Q,R <:Union{Taylor0,Number}}","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.muladdT-Union{Tuple{R}, Tuple{Q}, Tuple{P}, Tuple{P, Q, R, Taylor0}} where {P, Q, R<:Union{Number, Taylor0}}","page":"Taylor0","title":"QuantizedSystemSolver.muladdT","text":"muladdT(a::P,b::Q,c::R,cache1::Taylor0) where {P,Q,R <:Union{Taylor0,Number}} cache1=a*b+c\n\n\n\n\n\n","category":"method"},{"location":"Taylor0/","page":"Taylor0","title":"Taylor0","text":"mulsub(a::P,b::Q,c::R,cache1::Taylor0) where {P,Q,R <:Union{Taylor0,Number}}","category":"page"},{"location":"Taylor0/#QuantizedSystemSolver.mulsub-Union{Tuple{R}, Tuple{Q}, Tuple{P}, Tuple{P, Q, R, Taylor0}} where {P, Q, R<:Union{Number, Taylor0}}","page":"Taylor0","title":"QuantizedSystemSolver.mulsub","text":"mulsub(a::P,b::Q,c::R,cache1::Taylor0) where {P,Q,R <:Union{Taylor0,Number}} cache1=a*b-c\n\n\n\n\n\n","category":"method"},{"location":"algorithm/#Algorithms","page":"Algorithms","title":"Algorithms","text":"","category":"section"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" qss1()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.qss1-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.qss1","text":"qss1() calls the explicit quantized state system solver with order 1\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" qss2()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.qss2-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.qss2","text":"qss2() calls the explicit quantized state system solver with order 2\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" qss3()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.qss3-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.qss3","text":"qss3() calls the explicit quantized state system solver with order 3\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" liqss1()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.liqss1-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.liqss1","text":"liqss1() calls the  imlicit quantized state system solver with order 1.\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" liqss2()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.liqss2-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.liqss2","text":"liqss2() calls the  imlicit quantized state system solver with order 2.\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" liqss3()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.liqss3-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.liqss3","text":"liqss3() calls the  imlicit quantized state system solver with order 3.\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" nmliqss1()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.nmliqss1-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.nmliqss1","text":"nmliqss1() calls the modified imlicit quantized state system solver with order 1. It is efficient when the system contains large entries outside the main diagonal of the Jacobian .\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" nmliqss2()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.nmliqss2-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.nmliqss2","text":"nmliqss2() calls the modified imlicit quantized state system solver with order 2. It is efficient when the system contains large entries outside the main diagonal of the Jacobian .\n\n\n\n\n\n","category":"method"},{"location":"algorithm/","page":"Algorithms","title":"Algorithms","text":" nmliqss3()  ","category":"page"},{"location":"algorithm/#QuantizedSystemSolver.nmliqss3-Tuple{}","page":"Algorithms","title":"QuantizedSystemSolver.nmliqss3","text":"nmliqss3() calls the modified imlicit quantized state system solver with order 3. It is efficient when the system contains large entries outside the main diagonal of the Jacobian .\n\n\n\n\n\n","category":"method"},{"location":"algorithmDev/#Algorithm-Extension","page":"Algorithm Extension","title":"Algorithm Extension","text":"","category":"section"},{"location":"algorithmDev/","page":"Algorithm Extension","title":"Algorithm Extension","text":" QuantizedSystemSolver.ALGORITHM{N,O}","category":"page"},{"location":"algorithmDev/#QuantizedSystemSolver.ALGORITHM","page":"Algorithm Extension","title":"QuantizedSystemSolver.ALGORITHM","text":"ALGORITHM{N,O} This is superclass for all QSS algorithms. It is parametric on these:\n\n- The name of the algorithm N\n\n- The order of the algorithm O\n\n\n\n\n\n","category":"type"},{"location":"Problem/#Problem","page":"Problem","title":"Problem","text":"","category":"section"},{"location":"Problem/","page":"Problem","title":"Problem","text":" QuantizedSystemSolver.NLODEProblem{PRTYPE,T,Z,Y,CS}","category":"page"},{"location":"Problem/#QuantizedSystemSolver.NLODEProblem","page":"Problem","title":"QuantizedSystemSolver.NLODEProblem","text":"NLODEProblem{PRTYPE,T,Z,Y,CS} This is superclass for all NLODE problems. It is parametric on these:\n\n- The problem type PRTYPE.\n\n- The number of continuous variables T\n\n- The number of events (zero crossing functions) Z\n\n- The actual number of events (an if-else statment has one zero crossing functions and two events) Y\n\n- The cache size CS.\n\n\n\n\n\n","category":"type"},{"location":"Problem/","page":"Problem","title":"Problem","text":"QuantizedSystemSolver.NLODEContProblem{PRTYPE,T,Z,Y,CS}","category":"page"},{"location":"Problem/#QuantizedSystemSolver.NLODEContProblem","page":"Problem","title":"QuantizedSystemSolver.NLODEContProblem","text":"NLODEContProblem{PRTYPE,T,Z,Y,CS} A struct that holds the Problem of a system of ODEs. It has the following fields:\n\n- prname: The name of the problem\n\n- prtype: The type of the problem\n\n- a: The size of the problem\n\n- b: The number of zero crossing functions\n\n- c: The number of discrete events\n\n- cacheSize: The size of the cache\n\n- initConditions: The initial conditions of the problem\n\n- eqs: The function that holds all the ODEs\n\n- jac: The Jacobian dependency\n\n- SD: The state derivative dependency\n\n- exactJac: The exact Jacobian function\n\n- jacDim: The Jacobian dimension (if sparsity to be exploited)\n\n\n\n\n\n","category":"type"},{"location":"solutionDev/#Solution-Extension","page":"Solution Extension","title":"Solution Extension","text":"","category":"section"},{"location":"solutionDev/","page":"Solution Extension","title":"Solution Extension","text":"QuantizedSystemSolver.Sol{T,O}","category":"page"},{"location":"solutionDev/#QuantizedSystemSolver.Sol","page":"Solution Extension","title":"QuantizedSystemSolver.Sol","text":"Sol{T,O} This is superclass for all QSS solutions. It is parametric on these:\n\n- The number of continuous variables T\n\n- The order of the algorithm O\n\n\n\n\n\n","category":"type"},{"location":"solutionDev/","page":"Solution Extension","title":"Solution Extension","text":"QuantizedSystemSolver.LightSol{T,O}","category":"page"},{"location":"solutionDev/#QuantizedSystemSolver.LightSol","page":"Solution Extension","title":"QuantizedSystemSolver.LightSol","text":"LightSol{T,O} A struct that holds the solution of a system of ODEs. It has the following fields:\n\n- size: The number of continuous variables T\n\n- order: The order of the algorithm O\n\n- savedTimes: A vector of vectors of Float64 that holds the times at which the continuous variables were saved\n\n- savedVars: A vector of vectors of Float64 that holds the values of the continuous variables at the times they were saved\n\n- algName: The name of the algorithm used to solve the system\n\n- sysName: The name of the system\n\n- absQ: The absolute tolerance used in the simulation\n\n- totalSteps: The total number of steps taken by the algorithm\n\n- simulStepCount: The number of simultaneous updates during the simulation\n\n- evCount: The number of events that occurred during the simulation\n\n- numSteps: A vector of Int that holds the number of steps taken by the algorithm for each continuous variable\n\n- ft: The final time of the simulation\n\n\n\n\n\n","category":"type"},{"location":"#Quantized-System-Solver","page":"Home","title":"Quantized System Solver","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Pages = [\"userGuide.md\", \"developperGuide.md\",\"examples.md\"]\nDepth = 1","category":"page"}]
}
