---
title: "Basic Syntax"
date: 2025-10-24
draft: false
weight: 1
---

The basic syntax of Siko is clean and familiar, with curly braces for blocks and explicit type annotations where needed.

## Hello World

```siko
module Main {

fn main() {
  println("Hello, Siko!");
}

}
```

## Variables

Variables are declared with `let` (immutable) or `let mut` (mutable):

```siko
let x = 42;          // immutable
let mut y = 10;      // mutable
y = y + 5;           // allowed
```

## Comments

```siko
// Single-line comment

/*
  Multi-line comment
  spanning multiple lines
*/
```

## Blocks and Scope

Blocks create new scopes:

```siko
{
  let x = 10;
  println("${x}");
}
// x is not accessible here
```
