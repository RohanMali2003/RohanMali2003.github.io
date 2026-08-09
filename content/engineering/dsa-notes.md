---
title: DSA Notes
description: Reference notes on data structures, algorithms, and complexity patterns.
tags: [engineering, algorithms]
date: 2026-08-10
---

# DSA Notes

Working reference for data structures and algorithm patterns.

## Core Data Structures

### Hash Maps
`unordered_map` in C++ provides O(1) average lookup.

```cpp
unordered_map<int, int> freq;
for (int x : arr) freq[x]++;
```

### Binary Search Trees
In-order traversal gives sorted output. Standard BST height is O(log n) balanced, O(n) worst case. `std::map` uses a Red-Black tree under the hood.

### Segment Trees
Range queries and point updates in O(log n).

```cpp
void build(int node, int l, int r) {
    if (l == r) { tree[node] = arr[l]; return; }
    int mid = (l + r) / 2;
    build(2*node, l, mid);
    build(2*node+1, mid+1, r);
    tree[node] = tree[2*node] + tree[2*node+1];
}
```

---

## Algorithm Patterns

### Sliding Window
For contiguous subarray problems. Two pointers expand right and shrink left when constraints are violated.

### Divide & Conquer
Merge sort, quick sort, and closest pair of points.

---

## Complexity Reference

| Operation | Array | Linked List | BST (balanced) | Hash Map |
|---|---|---|---|---|
| Access | O(1) | O(n) | O(log n) | O(1) avg |
| Search | O(n) | O(n) | O(log n) | O(1) avg |
| Insert | O(n) | O(1) | O(log n) | O(1) avg |
| Delete | O(n) | O(1) | O(log n) | O(1) avg |
