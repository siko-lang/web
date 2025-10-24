---
title: "Language Reference"
date: 2025-10-24
draft: false
layout: reference
---

## Introduction

Siko is a modern, imperative programming language designed for performance and safety. This reference guide covers all aspects of the language, from basic syntax to advanced features like coroutines and effect handlers.

## Basic Syntax

The basic syntax of Siko is clean and familiar, with curly braces for blocks and explicit type annotations where needed.

```siko
module Main {

fn main() {
  println("Hello, Siko!");
}

}
```

Variables are declared with `let` (immutable) or `let mut` (mutable):

```siko
let x = 42;
let mut y = 10;
y = y + 5;
```

## Types

Siko has a rich type system with primitive types, structs, enums, and generic types.

### Primitive Types

- `Int` - Integer type
- `Float` - Floating point number
- `String` - String type
- `Bool` - Boolean type
- `()` - Unit type (empty tuple)

### Structs

Structs are defined with fields:

```siko
struct Point {
  x: Int,
  y: Int
}
```

### Enums

Enums can have variants with associated data:

```siko
enum Option[T] {
  Some(T),
  None
}
```

## Expressions

Siko is expression-oriented, meaning most constructs return values.

### If Expressions

```siko
let value = if condition {
  42
} else {
  0
};
```

### Match Expressions

Pattern matching is powerful and exhaustive:

```siko
match option {
  Some(value) => println("Got: ${value}"),
  None => println("Nothing"),
}
```

## Functions

Functions are first-class values in Siko.

```siko
fn add(a: Int, b: Int) -> Int {
  a + b
}

fn generic_function[T](value: T) -> T {
  value
}
```

## Modules

Code organization is done through modules:

```siko
module MyModule {

pub fn public_function() {
  // visible outside module
}

fn private_function() {
  // only visible within module
}

}
```

## Traits & Instances

Traits define interfaces that types can implement through instances.

```siko
trait Show[T] {
  fn show(self) -> String
}

instance Show[Int] {
  fn show(self) -> String {
    // implementation
  }
}
```

## Coroutines

Coroutines provide lightweight concurrency primitives.

```siko
// Placeholder for coroutine documentation
// Coming soon!
```

## Effect Handlers

Effect handlers allow you to define and handle computational effects in a type-safe way.

```siko
effect Reader[T] {
  fn ask() -> T
}

fn use_reader() {
  let value = ask();
  println("Value: ${value}");
}
```

## Memory Management

Siko uses automatic memory management with ownership tracking and compile-time lifetime analysis.

- Values have single ownership
- Borrowing is explicit with `&` for immutable and `&mut` for mutable
- No garbage collection, deterministic destruction

## Concurrency

Concurrency primitives and patterns for parallel execution.

```siko
// Placeholder for concurrency documentation
// Coming soon!
```

## Foreign Function Interface

Siko can interoperate with C libraries through its FFI.

```siko
// Placeholder for FFI documentation
// Coming soon!
```
