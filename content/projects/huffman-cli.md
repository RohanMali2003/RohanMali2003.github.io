---
title: Huffman Compression CLI
description: C++ command-line tool for lossless file compression using Huffman coding.
tags: [projects, cpp]
date: 2026-08-10
---

# Huffman Compression CLI

**Language**: C++ (C++17)  

A command-line tool that compresses and decompresses files using Huffman coding without external dependencies.

```bash
./huffman compress input.txt output.huf
./huffman decompress output.huf restored.txt
```

---

## Architecture

```
File Input -> Frequency Table -> Huffman Tree -> Code Table -> Encoded Bitstream -> Output
```

### Bit-Level Buffering

Buffers individual bits into bytes for file output:

```cpp
class BitWriter {
    uint8_t buffer = 0;
    int bitCount = 0;
    ofstream& out;
public:
    void write(bool bit) {
        buffer = (buffer << 1) | bit;
        if (++bitCount == 8) { out.put(buffer); buffer = 0; bitCount = 0; }
    }
    void flush() {
        if (bitCount > 0) {
            buffer <<= (8 - bitCount);
            out.put(buffer);
        }
    }
};
```
