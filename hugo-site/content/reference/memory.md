---
title: "Memory Management"
date: 2025-10-24
draft: false
weight: 8
---

Siko uses automatic memory management with ownership tracking and compile-time lifetime analysis.

## Ownership

Values have single ownership by default:

```siko
let x = MyStruct { };
let y = x;  // x is moved to y, x is no longer valid
```

## Borrowing

Borrow values without transferring ownership:

### Immutable Borrow

```siko
fn read_value(value: &Int) {
  println("${*value}");
}

let x = 42;
read_value(&x);  // x is still valid after this
```

### Mutable Borrow

```siko
fn modify_value(value: &mut Int) {
  *value = *value + 1;
}

let mut x = 42;
modify_value(&mut x);
```

## Lifetimes

Siko tracks lifetimes automatically, but you can be explicit when needed:

```siko
struct Reference['a] {
  value: &'a Int
}
```

## Destructors

The `Drop` trait defines cleanup behavior:

```siko
instance Drop[MyResource] {
  fn drop(self) {
    // cleanup code
  }
}
```

## No Garbage Collection

- All memory is managed at compile time
- No runtime overhead
- Deterministic destruction
- No stop-the-world pauses
