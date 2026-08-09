---
title: Autonomous Budget Assistant
description: Financial transaction parser and LLM categorization engine.
tags: [projects, ai]
date: 2026-08-10
---

# Autonomous Budget Assistant

**Language**: Python  
**Stack**: Python, LLM API, CSV/JSON parsing

An automated system that parses raw transaction CSVs, normalizes merchant names, and categorizes spending.

---

## Architecture

```
CSV Input -> Parser -> Transaction Normalizer -> LLM Categorizer -> Summary Generator
```

### Parser Implementation

```python
import csv
from dataclasses import dataclass

@dataclass
class Transaction:
    date: str
    description: str
    amount: float
    type: str

def parse_csv(filepath: str) -> list[Transaction]:
    transactions = []
    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            txn = Transaction(
                date=row['Date'],
                description=row['Narration'].strip(),
                amount=float(row['Withdrawal Amt.'] or 0),
                type='debit' if row['Withdrawal Amt.'] else 'credit'
            )
            transactions.append(txn)
    return transactions
```
