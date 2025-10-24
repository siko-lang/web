---
title: "Effect Handlers"
date: 2025-10-24
draft: false
weight: 7
---

Effect handlers allow you to define and handle computational effects in a type-safe way.

## Effect Definition

```siko
effect Reader[T] {
  fn ask() -> T
}

effect Writer[T] {
  fn tell(value: T)
}
```

## Using Effects

```siko
fn use_reader() {
  let value = ask();
  println("Value: ${value}");
}
```

## Handling Effects

Effects are handled using `with` blocks:

```siko
fn provide_value() {
  with Reader.ask = || { 42 } {
    use_reader();  // ask() will return 42
  }
}
```

## Multiple Effects

Handle multiple effects at once:

```siko
fn example() {
  with Reader.ask = || { 10 },
       Writer.tell = |x| { println("Told: ${x}") } {
    let value = ask();
    tell(value * 2);
  }
}
```

## Effect Polymorphism

Functions can be polymorphic over effects:

```siko
fn generic_computation[E: Effect](/* ... */) {
  // Can use effect E
}
```
