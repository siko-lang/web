---
title: "Modules"
date: 2025-10-24
draft: false
weight: 5
---

Code organization is done through modules.

## Module Definition

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

## Importing Modules

```siko
module Main {

import MyModule

fn main() {
  MyModule.public_function();
}

}
```

## Qualified Imports

Import with an alias:

```siko
import MyModule as M

fn main() {
  M.public_function();
}
```

## Selective Imports

Import specific items:

```siko
import MyModule (public_function, SomeType)

fn main() {
  public_function();  // no prefix needed
}
```

## Module Hierarchy

Modules can be nested:

```siko
module Parent.Child {
  pub fn nested_function() {}
}
```
