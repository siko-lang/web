---
title: "Foreign Function Interface"
date: 2025-10-24
draft: false
weight: 11
---

Siko can interoperate with C libraries through its Foreign Function Interface (FFI).

## Placeholder Documentation

This section is under development. The FFI will support:

- Calling C functions from Siko
- Exposing Siko functions to C
- Safe wrapper patterns
- Type conversions between Siko and C

## Basic Concept

```siko
// Example syntax (subject to change)

extern fn c_function(x: Int) -> Int;

fn call_c() {
  let result = c_function(42);
}
```

## Safety Considerations

- FFI calls are inherently unsafe
- Proper wrapping is essential
- Type safety at the boundary

More documentation coming soon!
