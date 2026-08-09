---
title: Agentic AI & LLM Architectures
description: Notes on building agentic systems — autonomous agents, tool use, and experience replay.
tags: [engineering, ai]
date: 2026-08-10
---

# Agentic AI & LLM Architectures

Notes on designing autonomous LLM systems that plan, call tools, and iterate.

## Core Concepts

An agentic pipeline combines:
1. **Goal definition**
2. **Tool integration** (APIs, search, code execution)
3. **Execution loop** (ReAct pattern: Think -> Act -> Observe)

---

## Experience Replay

Derived from reinforcement learning (DQN). Stores `(state, action, reward, next_state)` tuples to sample mini-batches during training.

```python
from collections import deque
import random

replay_buffer = deque(maxlen=10000)

def store(state, action, reward, next_state, done):
    replay_buffer.append((state, action, reward, next_state, done))

def sample(batch_size=64):
    return random.sample(replay_buffer, batch_size)
```

---

## Tool-Use Patterns

### Function Calling
The model outputs structured JSON matching a predefined schema. An external runner executes the function and returns the result to the context.

### ReAct Pattern
```
Thought: I need to query the current weather.
Action: search("weather Amherst MA")
Observation: 22°C, clear.
Answer: It is 22°C and clear in Amherst.
```
