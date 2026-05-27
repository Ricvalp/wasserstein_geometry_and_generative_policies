# AGENTS.md

## Project Overview

This project studies the intersection of:

- Optimal Transport (OT)
- Wasserstein Geometry
- Wasserstein Gradient Flows (WGF)
- Schrödinger Bridges (SB)
- Contact Hamiltonian Geometry
- Generative Modeling
- Reinforcement Learning (RL)
- Drifting Models and Drifting Policies

The long-term goal is to understand whether ideas from:

> “CONTACT WASSERSTEIN GEODESICS FOR NON-CONSERVATIVE SCHRODINGER BRIDGES”

can improve or generalize:

- drifting generative models,
- drifting-field policies,
- and offline-to-online RL algorithms.

The project is theoretical/mathematical but strongly motivated by modern AI systems.

---

# Main Research Question

Can policy optimization or generative modeling be formulated as a:

- non-conservative transport process,
- contact Wasserstein gradient flow,
- or generalized Schrödinger bridge

instead of a standard conservative Wasserstein gradient flow?

In particular:

- standard OT/WGF conserves probability mass and follows conservative variational dynamics;
- contact geometry allows dissipation and energy injection;
- offline-to-online RL is naturally non-conservative because the target distribution evolves during training.

The hypothesis is that contact-Wasserstein geometry may provide a better mathematical framework for:

- policy improvement,
- behavior-to-optimal transport,
- entropy modulation,
- trust-region dynamics,
- exploration/exploitation tradeoffs,
- and drifting-policy learning.

---

# Core Papers

## Optimal Transport / Wasserstein RL

- Policy Optimization as Wasserstein Gradient Flows
- Wasserstein Formulation of Reinforcement Learning

## Schrödinger Bridges

- Contact Wasserstein Geodesics for Non-Conservative Schrödinger Bridges

## Drifting Models

- Generative Modeling via Drifting
- Drifting Field Policy: A One-Step Generative Policy via Wasserstein Gradient Flow

---

# Main Mathematical Objects

The project revolves around the following concepts.

## Probability Measures

A model or policy induces distributions:
\[
\rho_\theta = (f_\theta)_\# \rho_0.
\]

## Wasserstein Geometry

Probability measures are treated as points in:
\[
(\mathcal P_2(\mathbb R^d), W_2).
\]

## Continuity Equations

Distribution dynamics are described by:
\[
\partial_t \rho_t + \nabla \cdot (\rho_t v_t)=0.
\]

## Wasserstein Gradient Flows

Distribution evolution follows:
\[
\partial_t \rho_t
=
\nabla \cdot
\left(
\rho_t \nabla \frac{\delta \mathcal F}{\delta \rho}
\right).
\]

## Schrödinger Bridges

Entropy-regularized stochastic transport between endpoint distributions.

## Contact Hamiltonian Systems

Generalization of Hamiltonian mechanics allowing non-conservative dynamics.

---

# Drifting Policies

A drifting policy is a one-step generative policy:
\[
a = f_\theta(s,z),
\qquad z \sim \rho_0.
\]

The induced action distribution:
\[
\pi_\theta(\cdot|s)
=
(f_\theta(s,\cdot))_\# \rho_0
\]
evolves during training.

The key idea is to interpret policy improvement as transport in probability space.

---

# Main Hypothesis Under Investigation

Potential bridge:

\[
\pi_\beta
\longrightarrow
\pi_Q
\]

where:

- \(\pi_\beta\) is the behavior policy,
- \(\pi_Q\) is a soft value-improved policy.

Instead of standard Wasserstein transport, we investigate:

- non-conservative bridges,
- contact-Wasserstein geodesics,
- energy-dissipating transport dynamics.

Possible applications:

- offline-to-online RL,
- conservative RL,
- trust-region policy updates,
- generative policies,
- exploration control.

---

# Syllabus Structure

The project includes a self-contained mathematical syllabus.

## Phase 1
Probability measures, pushforwards, weak calculus.

## Phase 2
Optimal transport and Wasserstein geometry.

## Phase 3
Wasserstein gradient flows and PDEs.

## Phase 4
Policy optimization and Wasserstein RL.

## Phase 5
Schrödinger bridges and stochastic control.

## Phase 6
Contact geometry and non-conservative dynamics.

## Phase 7
Drifting generative models.

## Phase 8
Drifting-field policies and offline-to-online RL.

---

# Writing Style

Documents should:

- be mathematically rigorous but AI-oriented;
- resemble graduate applied mathematics lecture notes;
- remain relatively self-contained;
- prioritize geometric intuition;
- connect formalism to generative modeling and RL.

---

# Notation Conventions

## Measures
\[
\mu,\nu,\rho \in \mathcal P(\mathbb R^d)
\]

## Pushforward
\[
T_\# \mu
\]

## Wasserstein Distance
\[
W_2(\mu,\nu)
\]

## KL Divergence
\[
\mathrm{KL}(\mu\|\nu)
\]

## Velocity Fields
\[
v_t(x)
\]

## Policy
\[
\pi(a|s)
\]

## Value Function
\[
Q(s,a)
\]

---

# Long-Term Goal

Develop a mathematically principled framework where:

- generative modeling,
- policy optimization,
- optimal transport,
- stochastic control,
- and non-conservative geometric mechanics

are unified under a common variational and geometric formalism.


# Linking Definitions, Theorems, and Proofs.

When I ask you to write a linked definition, theorem, or proof, you will write it in seperate file and put it in the `definitions`, `theorems`, or `proofs` folder respectively. You will also link it in the main text where it is referenced and add a link macro in the preamble. For example, if I ask you to write a definition of "measurable", you will create a file `definitions/measurability.tex`. Similar for theorems and proofs.

