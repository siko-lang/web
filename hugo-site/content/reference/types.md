---
title: "Types"
date: 2025-10-24
draft: false
weight: 2
---

Siko has a rich type system with primitive types, structs, enums, and generic types.

## Primitive Types

- `Int` - Integer type
- `Float` - Floating point number
- `String` - String type
- `Bool` - Boolean type
- `()` - Unit type (empty tuple)

## Structs

Structs are defined with fields:

```siko
struct Point {
  x: Int,
  y: Int
}

fn main() {
  let p = Point { x: 10, y: 20 };
  println("Point: ${p.x}, ${p.y}");
}
```

## Enums

Enums can have variants with associated data:

```siko
enum Option[T] {
  Some(T),
  None
}

enum Result[T, E] {
  Ok(T),
  Err(E)
}
```

## Generic Types

Types can be parameterized with type variables:

```siko
struct Container[T] {
  value: T
}

enum List[T] {
  Cons(T, List[T]),
  Nil
}
```

## Type Aliases

Create aliases for existing types:

```siko
type IntPair = (Int, Int);
type StringMap = Map[String, String];
```
