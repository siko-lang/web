---
title: "Functions"
date: 2025-10-24
draft: false
weight: 4
---

Functions are first-class values in Siko.

## Function Definition

```siko
fn add(a: Int, b: Int) -> Int {
  a + b
}
```

## Generic Functions

Functions can be parameterized with type variables:

```siko
fn identity[T](value: T) -> T {
  value
}

fn map[T, U](list: List[T], f: fn(T) -> U) -> List[U] {
  // implementation
}
```

## Multiple Return Values

Use tuples to return multiple values:

```siko
fn divide(a: Int, b: Int) -> (Int, Int) {
  (a / b, a % b)
}

let (quotient, remainder) = divide(10, 3);
```

## Higher-Order Functions

Functions can take other functions as parameters:

```siko
fn apply[T](value: T, f: fn(T) -> T) -> T {
  f(value)
}
```

## Method Syntax

Functions can be called with method syntax when the first parameter is `self`:

```siko
trait Show[T] {
  fn show(self) -> String
}

// Can be called as: value.show()
```
