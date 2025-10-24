---
title: "Expressions"
date: 2025-10-24
draft: false
weight: 3
---

Siko is expression-oriented, meaning most constructs return values.

## If Expressions

```siko
let value = if condition {
  42
} else {
  0
};
```

## Match Expressions

Pattern matching is powerful and exhaustive:

```siko
match option {
  Some(value) => println("Got: ${value}"),
  None => println("Nothing"),
}
```

Match on multiple values:

```siko
match (x, y) {
  (0, 0) => println("Origin"),
  (0, _) => println("On X axis"),
  (_, 0) => println("On Y axis"),
  (a, b) => println("Point: ${a}, ${b}"),
}
```

## Loops

### While Loop

```siko
let mut i = 0;
while i < 10 {
  println("${i}");
  i += 1;
}
```

### Loop with Break

```siko
loop {
  if condition {
    break;
  }
}
```

## Block Expressions

The last expression in a block is its value:

```siko
let result = {
  let x = compute();
  let y = transform(x);
  y * 2  // returned from block
};
```
