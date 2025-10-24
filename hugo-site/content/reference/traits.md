---
title: "Traits & Instances"
date: 2025-10-24
draft: false
weight: 6
---

Traits define interfaces that types can implement through instances.

## Trait Definition

```siko
trait Show[T] {
  fn show(self) -> String
}

trait Eq[T] {
  fn equals(self, other: T) -> Bool
}
```

## Canonical Instances

Canonical instances are global and unique for each type-trait pair:

```siko
instance Show[Int] {
  fn show(self) -> String {
    // implementation
  }
}
```

## Named Instances

Named instances can be imported and used in specific contexts:

```siko
pub instance MyShowInstance Show[MyType] {
  fn show(self) -> String {
    // custom implementation
  }
}
```

## Instance Resolution

Siko uses a priority-based resolution:
1. Module-local instances (highest priority)
2. Imported instances
3. Global canonical instances (lowest priority)

## Generic Constraints

Functions can require trait implementations:

```siko
fn print_value[T: Show[T]](value: T) {
  println(value.show());
}
```

Multiple constraints:

```siko
fn compare_and_show[T: Eq[T] + Show[T]](a: T, b: T) {
  if a.equals(b) {
    println("Equal: ${a.show()}");
  }
}
```
