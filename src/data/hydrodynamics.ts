import { Course } from './courses';

export const hydrodynamicsData: Course = {
  id: "hydrodynamics",
  code: "Math-41XX",
  title: "Hydrodynamics",
  description: "Theoretical Hydrodynamics basic concepts, kinematics of fluid in motion, and Bernoulli's equation with applications.",
  years: [
    {
      year: "Chapter 1 & 2",
      session: "Notes & Question Analysis",
      sections: [
        {
          title: "Basic Concepts & Kinematics",
          questions: [
            {
              id: "q1",
              part: "1.",
              question: "What is Hydrodynamics? Differentiate between Real and Ideal Fluid.",
              marks: 4,
              solution: `### Hydrodynamics and Fluid Types\n\n**Hydrodynamics:** It is a branch of fluid mechanics that specifically refers to the study of moving incompressible fluids (liquids).\n\n**Real (Viscous) Fluid:** A fluid is said to be real when normal as well as shearing (tangential) stress exists. Examples include syrup and heavy oil.\n\n**Ideal (Perfect/Inviscid) Fluid:** A fluid is said to be ideal when it does not exert any shearing stress, whether at rest or in motion. It is assumed to be frictionless. Water and air are often treated as ideal fluids for simplified theoretical analysis.`
            },
            {
              id: "q2",
              part: "2.",
              question: "Define the following types of flow: (i) Laminar and Turbulent Flow (ii) Steady and Unsteady Flow (iii) Uniform and Non-uniform Flows (iv) Rotational and Irrotational Flows (v) Barotropic flow.",
              marks: 5,
              solution: `### Types of Fluid Flow\n\n**(i) Laminar and Turbulent Flow:**\n- *Laminar:* A flow in which each particle traces out a definite curve and the curves traced out by any two different fluid particles do not intersect.\n- *Turbulent:* A flow in which each fluid particle does not trace out a definite curve and the curves traced out by fluid particles intersect randomly.\n\n**(ii) Steady and Unsteady Flow:**\n- *Steady:* A flow in which properties and conditions (like velocity, pressure, density) at any point are independent of time. $\\frac{\\partial}{\\partial t} = 0$.\n- *Unsteady:* A flow in which properties and conditions depend on time.\n\n**(iii) Uniform and Non-uniform Flows:**\n- *Uniform:* Fluid particles possess equal velocities at each section of the channel or pipe.\n- *Non-uniform:* Fluid particles possess different velocities at each section.\n\n**(iv) Rotational and Irrotational Flows:**\n- *Rotational:* Particles of the fluid go on rotating about their own axis while flowing (vorticity $\\vec{w} \\neq 0$).\n- *Irrotational:* Particles do not rotate about their own axis (vorticity $\\vec{w} = 0$).\n\n**(v) Barotropic flow:**\nA flow is said to be barotropic when the pressure is a function of density only, i.e., $p = f(\\rho)$.`
            },
            {
              id: "q3",
              part: "3.",
              question: "State the Equation of Continuity (Conservation of mass) and write its vector form and Cartesian form.",
              marks: 5,
              solution: `### Equation of Continuity\n\n**Statement:** The law of conservation of mass states that fluid mass can neither be created nor can be destroyed. The equation of continuity expresses the fact that the increase in the mass of the fluid within any closed surface drawn in the fluid must be equal to the excess of the mass that flows in over the mass that flows out.\n\n**Vector Form (Euler's Method):**\n$$ \\frac{\\partial \\rho}{\\partial t} + \\nabla \\cdot (\\rho \\vec{q}) = 0 $$\nUsing the material (Lagrangian) derivative $\\frac{D\\rho}{Dt}$, this can be written as:\n$$ \\frac{D\\rho}{Dt} + \\rho \\nabla \\cdot \\vec{q} = 0 $$\nFor an incompressible and homogeneous fluid, density $\\rho$ is constant, so $\\nabla \\cdot \\vec{q} = 0$ (divergence of velocity is zero).\n\n**Cartesian Form:**\n$$ \\frac{\\partial \\rho}{\\partial t} + \\frac{\\partial (\\rho u)}{\\partial x} + \\frac{\\partial (\\rho v)}{\\partial y} + \\frac{\\partial (\\rho w)}{\\partial z} = 0 $$\nFor an incompressible homogeneous fluid, this simplifies to:\n$$ \\frac{\\partial u}{\\partial x} + \\frac{\\partial v}{\\partial y} + \\frac{\\partial w}{\\partial z} = 0 $$`
            },
            {
              id: "q4",
              part: "4.",
              question: "Define Stream Lines, Path Lines, and Stream Tube.",
              marks: 3,
              solution: `### Flow Lines\n\n**Stream Lines:** A curve drawn in the fluid such that at any time $t$, the direction of the tangent at any point of the curve coincides with the direction of the velocity of the fluid particle at that point. Differential equation:\n$$ \\frac{dx}{u} = \\frac{dy}{v} = \\frac{dz}{w} $$\n\n**Path Lines:** A curve which a particular fluid particle describes during its motion over time. Differential equation:\n$$ \\dot{x}=u, \\quad \\dot{y}=v, \\quad \\dot{z}=w $$\n\n**Stream Tube:** The stream lines drawn through each point of a closed curve enclose a tubular surface in the fluid called a stream tube. A tube of infinitesimal cross-section is called a stream filament.`
            },
            {
              id: "q5",
              part: "5.",
              question: "Define Velocity Potential. What is the necessary and sufficient condition for its existence?",
              marks: 4,
              solution: `### Velocity Potential\n\n**Velocity Potential:** Suppose that there exists a scalar function $\\phi(x,y,z,t)$ uniform throughout the fluid flow such that its negative gradient gives the velocity vector, i.e., \n$$ u = -\\frac{\\partial \\phi}{\\partial x}, \\quad v = -\\frac{\\partial \\phi}{\\partial y}, \\quad w = -\\frac{\\partial \\phi}{\\partial z} $$\nThen $\\phi$ is called the velocity potential.\n\n**Condition for Existence:**\nThe necessary and sufficient condition for the existence of a velocity potential is that the flow is irrotational, i.e., \n$$ \\nabla \\times \\vec{q} = 0 \\quad (\\text{curl of velocity is zero}) $$\nFor an incompressible fluid with a velocity potential, $\\phi$ satisfies Laplace's equation: $\\nabla^2 \\phi = 0$.`
            },
            {
              id: "q6",
              part: "6.",
              question: "Define Vorticity, Vortex Line, and Vortex Tube.",
              marks: 3,
              solution: `### Rotational Elements\n\n**Vorticity:** If $\\vec{q}$ is the velocity vector of a fluid particle, the vector quantity $\\vec{w} = \\nabla \\times \\vec{q} = \\text{curl } \\vec{q}$ is called the vorticity vector. It measures the angular velocity of an infinitesimal element.\n\n**Vortex Line:** A curve in the fluid such that the tangent to it at each point gives the direction of vorticity $\\vec{w}$ at that point. Equation:\n$$ \\frac{dx}{\\xi} = \\frac{dy}{\\eta} = \\frac{dz}{\\zeta} $$\nwhere $\\xi, \\eta, \\zeta$ are the components of vorticity.\n\n**Vortex Tube:** The vortex lines drawn through each point of a closed curve enclose a tubular space in the fluid called a vortex tube.`
            }
          ]
        },
        {
          title: "Bernoulli's Equation & Applications",
          questions: [
            {
              id: "q7",
              part: "7.",
              question: "Describe the equation of conservation of mass on the equation of continuity for a stream filament.",
              marks: 4,
              solution: `### Equation of Continuity (Stream Filament)\n\nLet us consider a stream filament of liquid in the steady motion of an inviscid fluid.\nLet $\\sigma_1$ and $\\sigma_2$ be the cross-sectional areas of the fluid at points A and B respectively.\nLet $q_1$ and $q_2$ be the speeds of the fluid at A and B.\n\nThe volume of the fluid entering at A in unit time is $q_1 \\sigma_1$.\nSimilarly, the volume of the fluid going out at B in unit time is $q_2 \\sigma_2$.\n\nIf $\\rho_1, \\rho_2$ be the density of the fluid at A and B respectively, then the mass of the fluid entering at A is $q_1 \\rho_1 \\sigma_1$ and the mass going out through B is $q_2 \\rho_2 \\sigma_2$.\n\nSince the motion is steady, the same mass of fluid must enter at A and go out at B. Therefore:\n$$ q_1 \\rho_1 \\sigma_1 = q_2 \\rho_2 \\sigma_2 $$\n\nNow, if the fluid is incompressible, density is constant, i.e., $\\rho_1 = \\rho_2$.\nSo that,\n$$ q_1 \\sigma_1 = q_2 \\sigma_2 $$\nThis is called the equation of continuity for a 1D stream filament, or simply $q \\sigma = \\text{constant}$.`
            },
            {
              id: "q8",
              part: "8.",
              question: "State and prove Bernoulli's Theorem for inviscid fluid.",
              marks: 8,
              solution: `### Bernoulli's Theorem (Inviscid Fluid)\n\n**Statement:** For the steady motion of an inviscid barotropic fluid under conservative body force, the pressure at a point is given by:\n$$ \\int \\frac{dp}{\\rho} + \\frac{1}{2}q^2 + V = \\text{Constant} $$\n\n**Proof:**\nConsider a short circular cylindrical element AB of fluid whose axis is parallel to the flow. Let the normal cross-sectional area of the cylinder be $\\alpha$ and its length be $ds$, where $s$ is the arc of the streamline.\n\nThe pressure $p$ on the curved surface contributes nothing to the force in the direction of motion.\nThrust on the end A is $p\\alpha$ in the direction of motion.\nThrust on the end B is $-(p + \\frac{\\partial p}{\\partial s}\\delta s)\\alpha$ in the direction of motion.\nResultant forward thrust = $-\\frac{\\partial p}{\\partial s}\\delta s \\alpha$.\n\nLet the component of body force in the direction of motion be $F = -\\frac{\\partial V}{\\partial s}$ (conservative field). Total body force is $F \\rho \\alpha \\delta s$.\n\nEquation of motion by Newton's 2nd Law:\n$$ \\rho \\alpha \\delta s \\frac{Dq}{Dt} = F \\rho \\alpha \\delta s - \\frac{\\partial p}{\\partial s}\\delta s \\alpha $$\nDividing by $\\rho \\alpha \\delta s$:\n$$ \\frac{Dq}{Dt} = F - \\frac{1}{\\rho}\\frac{\\partial p}{\\partial s} = -\\frac{\\partial V}{\\partial s} - \\frac{1}{\\rho}\\frac{\\partial p}{\\partial s} $$\n\nSince the motion is steady ($\\frac{\\partial q}{\\partial t} = 0$), the material derivative is $\\frac{Dq}{Dt} = q \\frac{\\partial q}{\\partial s}$.\nSo,\n$$ q \\frac{\\partial q}{\\partial s} = -\\frac{\\partial V}{\\partial s} - \\frac{1}{\\rho}\\frac{\\partial p}{\\partial s} $$\n$$ \\frac{\\partial}{\\partial s}\\left(\\frac{1}{2}q^2\\right) + \\frac{\\partial V}{\\partial s} + \\frac{1}{\\rho}\\frac{\\partial p}{\\partial s} = 0 $$\nIntegrating with respect to $s$ along the streamline:\n$$ \\int \\frac{dp}{\\rho} + \\frac{1}{2}q^2 + V = \\text{Constant} $$\n(Proved)`
            },
            {
              id: "q9",
              part: "9.",
              question: "Deduce Bernoulli's theorem for compressible fluid (Barotropic flow) showing the work done and internal energy.",
              marks: 8,
              solution: `### Bernoulli's Theorem for Barotropic Flow\n\n**Statement:** The flow is called barotropic when the pressure is a function of density, $p = f(\\rho)$.\n\n**Proof:** Let us assume steady barotropic flow and a conservative field for which potential energy is $V$ (or $gh$). Energy per unit mass is:\n$$ K = \\frac{1}{2}q^2 + gh + E $$\nwhere $E$ is the internal energy per unit mass.\n\nBernoulli's equation (conservation of energy) between two points becomes:\n$$ \\frac{p_1}{\\rho_1} + \\frac{1}{2}q_1^2 + gh_1 + E_1 = \\frac{p_2}{\\rho_2} + \\frac{1}{2}q_2^2 + gh_2 + E_2 $$\n\nNow we find the value of internal energy $E$. The work done by gas during a small expansion of unit mass ($v = 1/\\rho$) is $p \\, dv = p \\, d(1/\\rho)$.\nTotal internal energy $E = \\int p \\, d(1/\\rho)$.\nUsing integration by parts:\n$$ E = \\int p \\, d(1/\\rho) = \\frac{p}{\\rho} - \\int \\frac{dp}{\\rho} $$\nLet the gas expand from state $(p_0, \\rho_0)$ to $(p, \\rho)$:\n$$ E = \\frac{p_0}{\\rho_0} - \\frac{p}{\\rho} + \\int_{p_0}^p \\frac{dp}{\\rho} $$\n\nSubstituting $E_1$ and $E_2$ into the energy equation:\n$$ \\frac{p_1}{\\rho_1} + K_1 = \\frac{p_2}{\\rho_2} + K_2 $$\n$$ \\frac{p_1}{\\rho_1} + \\left[ \\frac{1}{2}q_1^2 + gh_1 + \\frac{p_0}{\\rho_0} - \\frac{p_1}{\\rho_1} + \\int_{p_0}^{p_1} \\frac{dp}{\\rho} \\right] = \\dots $$\nThe terms $\\frac{p_1}{\\rho_1}$ cancel out, leaving:\n$$ \\int_{p_0}^{p_1} \\frac{dp}{\\rho} + \\frac{1}{2}q_1^2 + gh_1 = \\int_{p_0}^{p_2} \\frac{dp}{\\rho} + \\frac{1}{2}q_2^2 + gh_2 $$\nThus,\n$$ \\int_{p_0}^{p} \\frac{dp}{\\rho} + \\frac{1}{2}q^2 + gh = \\text{Constant along a streamline.} $$`
            },
            {
              id: "q10",
              part: "10.",
              question: "Apply Bernoulli's theorem to adiabatic expansion and derive the expression for velocity q.",
              marks: 6,
              solution: `### Application to Adiabatic Expansion\n\n**Relation:** For adiabatic expansion, pressure and density are related by $p = k\\rho^\\gamma$.\nFrom Bernoulli's theorem for barotropic flow:\n$$ \\int_{p_0}^{p} \\frac{dp}{\\rho} + \\frac{1}{2}q^2 + gh = \\text{Constant} $$\n\nLet's evaluate the integral. Since $\\rho = (p/k)^{1/\\gamma}$:\n$$ \\int_{p_0}^{p} \\frac{dp}{\\rho} = \\int_{p_0}^{p} \\left(\\frac{k}{p}\\right)^{1/\\gamma} dp = k^{1/\\gamma} \\left[ \\frac{p^{1-1/\\gamma}}{1-1/\\gamma} \\right]_{p_0}^p $$\n$$ = \\frac{\\gamma}{\\gamma-1} \\left[ \\frac{p}{\\rho} - \\frac{p_0}{\\rho_0} \\right] $$\n\nIf we take $p_0$ to be the pressure when velocity is zero (stagnation point) and neglect gravity ($gh=0$), Bernoulli's equation becomes:\n$$ \\frac{\\gamma}{\\gamma-1} \\frac{p}{\\rho} + \\frac{1}{2}q^2 = \\frac{\\gamma}{\\gamma-1} \\frac{p_0}{\\rho_0} $$\n$$ \\frac{1}{2}q^2 = \\frac{\\gamma}{\\gamma-1} \\left( \\frac{p_0}{\\rho_0} - \\frac{p}{\\rho} \\right) = \\frac{\\gamma p_0}{(\\gamma-1)\\rho_0} \\left( 1 - \\frac{p \\rho_0}{p_0 \\rho} \\right) $$\n\nUsing the adiabatic relation $\\frac{\\rho_0}{\\rho} = \\left(\\frac{p_0}{p}\\right)^{1/\\gamma}$, we substitute $\\frac{\\rho_0}{\\rho}$:\n$$ \\frac{p \\rho_0}{p_0 \\rho} = \\frac{p}{p_0} \\left(\\frac{p_0}{p}\\right)^{1/\\gamma} = \\left(\\frac{p}{p_0}\\right)^{1 - 1/\\gamma} = \\left(\\frac{p}{p_0}\\right)^{\\frac{\\gamma-1}{\\gamma}} $$\n\nFinally, the expression for velocity squared is:\n$$ q^2 = \\frac{2\\gamma p_0}{(\\gamma-1)\\rho_0} \\left[ 1 - \\left(\\frac{p}{p_0}\\right)^{\\frac{\\gamma-1}{\\gamma}} \\right] $$`
            },
            {
              id: "q11",
              part: "11.",
              question: "(Exercise 6) Liquid of density $\\rho$ is flowing along a horizontal pipe of variable cross-section connected with a differential pressure gauge at two points A & B. Show that mass $m$ flowing per second is $m = \\sigma_1\\sigma_2 \\sqrt{\\frac{2\\rho(p_1-p_2)}{\\sigma_1^2-\\sigma_2^2}}$.",
              marks: 6,
              solution: `### Mass Flow in Variable Cross-section Pipe\n\nLet $q_1, q_2$ be the speeds at A & B respectively. $p_1, p_2$ are the pressures, and $\\sigma_1, \\sigma_2$ are the cross-sectional areas.\n\nBy conservation of mass (Equation of Continuity):\n$$ m = \\sigma_1 q_1 \\rho = \\sigma_2 q_2 \\rho \\implies q_1 = \\frac{m}{\\sigma_1 \\rho}, \\quad q_2 = \\frac{m}{\\sigma_2 \\rho} $$\n\nSince the pipe is horizontal, potential energy is constant ($h_1 = h_2$). From Bernoulli's equation:\n$$ \\frac{p_1}{\\rho} + \\frac{1}{2}q_1^2 = \\frac{p_2}{\\rho} + \\frac{1}{2}q_2^2 $$\n$$ \\frac{p_1 - p_2}{\\rho} = \\frac{1}{2}(q_2^2 - q_1^2) $$\n\nSubstitute the values of $q_1$ and $q_2$:\n$$ \\frac{2(p_1 - p_2)}{\\rho} = \\left(\\frac{m}{\\sigma_2 \\rho}\\right)^2 - \\left(\\frac{m}{\\sigma_1 \\rho}\\right)^2 $$\n$$ \\frac{2(p_1 - p_2)}{\\rho} = \\frac{m^2}{\\rho^2} \\left( \\frac{1}{\\sigma_2^2} - \\frac{1}{\\sigma_1^2} \\right) = \\frac{m^2}{\\rho^2} \\left( \\frac{\\sigma_1^2 - \\sigma_2^2}{\\sigma_1^2 \\sigma_2^2} \\right) $$\n\nSolving for $m^2$:\n$$ m^2 = \\rho^2 \\frac{2(p_1 - p_2)}{\\rho} \\left( \\frac{\\sigma_1^2 \\sigma_2^2}{\\sigma_1^2 - \\sigma_2^2} \\right) = \\frac{2\\rho(p_1 - p_2)\\sigma_1^2 \\sigma_2^2}{\\sigma_1^2 - \\sigma_2^2} $$\n\nTaking the square root:\n$$ m = \\sigma_1\\sigma_2 \\sqrt{\\frac{2\\rho(p_1-p_2)}{\\sigma_1^2-\\sigma_2^2}} \\quad \\text{(Proved)} $$`
            },
            {
              id: "q12",
              part: "12.",
              question: "(Exercise 10) Show that the speed $q$ of gas flowing in a thin tube whose cross-section is $\\sigma$ at a point of distance $S$ in arc obeys the equation: $\\frac{d}{dS}(\\log \\sigma) + \\left(1 - \\frac{q^2}{c^2}\\right) \\frac{d}{dS}(\\log q) = 0$, where $c$ is the speed of sound.",
              marks: 7,
              solution: `### Speed of Gas in a Thin Tube\n\nFrom the law of conservation of mass:\n$$ \\rho \\sigma q = \\text{constant} $$\nTaking the natural logarithm on both sides and differentiating with respect to $S$:\n$$ \\log \\rho + \\log \\sigma + \\log q = \\text{constant} $$\n$$ \\frac{1}{\\rho}\\frac{d\\rho}{dS} + \\frac{1}{\\sigma}\\frac{d\\sigma}{dS} + \\frac{1}{q}\\frac{dq}{dS} = 0 \\quad \\text{--- (1)} $$\n\nFrom Bernoulli's equation for adiabatic expansion (without gravity):\n$$ \\int \\frac{dp}{\\rho} + \\frac{1}{2}q^2 = \\text{constant} $$\nDifferentiating w.r.t $S$:\n$$ \\frac{1}{\\rho}\\frac{dp}{dS} + q\\frac{dq}{dS} = 0 $$\n\nSince the speed of sound $c$ is given by $c^2 = \\frac{dp}{d\\rho}$, we can write $\\frac{dp}{dS} = \\frac{dp}{d\\rho} \\frac{d\\rho}{dS} = c^2 \\frac{d\\rho}{dS}$.\nSubstituting this back:\n$$ \\frac{c^2}{\\rho}\\frac{d\\rho}{dS} + q\\frac{dq}{dS} = 0 \\implies \\frac{1}{\\rho}\\frac{d\\rho}{dS} = -\\frac{q}{c^2}\\frac{dq}{dS} $$\n\nNow, substitute this expression into equation (1):\n$$ -\\frac{q}{c^2}\\frac{dq}{dS} + \\frac{1}{\\sigma}\\frac{d\\sigma}{dS} + \\frac{1}{q}\\frac{dq}{dS} = 0 $$\nRearranging the terms:\n$$ \\frac{1}{\\sigma}\\frac{d\\sigma}{dS} + \\frac{1}{q}\\frac{dq}{dS} - \\frac{q}{c^2}\\frac{dq}{dS} = 0 $$\n$$ \\frac{d}{dS}(\\log \\sigma) + \\frac{1}{q} \\left( 1 - \\frac{q^2}{c^2} \\right) \\frac{dq}{dS} = 0 $$\nSince $\\frac{1}{q}\\frac{dq}{dS} = \\frac{d}{dS}(\\log q)$, we get:\n$$ \\frac{d}{dS}(\\log \\sigma) + \\left(1 - \\frac{q^2}{c^2}\\right) \\frac{d}{dS}(\\log q) = 0 \\quad \\text{(Proved)} $$`
            }
          ]
        }
      ]
    }
  ]
};
