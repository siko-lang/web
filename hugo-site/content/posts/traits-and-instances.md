+++
date = '2025-08-30T00:00:00+02:00'
draft = false
title = 'Traits and instances'
+++

This post will explain how the trait system and instance resolution works in Siko.
Siko uses traits for describing interfaces, they can be used to constrain generic types in generic functions.
Here is a sample trait:

```siko
trait Foo[T] {
  fn foo(self) -> ()
}
```

This trait expresses that whatever type has an instance for this trait, that type will have a foo method that returns an empty
tuple. To be able to use the trait in practice you need to add instances for types.

```siko
struct Bar {

}

instance Foo[Bar] {
  fn foo(self) -> () {

  }
}
```

This instance expresses that the struct Bar implements the Foo interface and if you call its foo() method then the instance's implementation will be used. Let's use it.

```siko

fn someFunc[T: Foo[T]](value: T) {
  value.foo();
}

fn main() {
  let b = Bar();
  b.foo(); // this calls the instance's foo() function
  someFunc(b); // the monomorphized version of someFunc will call the same foo() function
}

```

So far this is kind of what you would expect in a language with generics, it even uses standard naming for these patterns. No surprise there. The cool part is how Siko mixes global instance resolution with Scala style scope based resolution.

### Canonical instances

If you do not add a name to your instance then it will be a so called canonical instance. It behaves as you would expect if you are familiar with Rust's type system (or any other similar system) and it is available globally. For each type and trait pair there can be only a single canonical instance. This ensures that canonical instances are unambiguous. In Rust lingo, this property is called coherence.

### Resolution of scoped instances

However, we are not stopping here. You can add names to instances and then they become something that you can export from your module and import from other modules.

```siko
module A {

// this instance is named MyFooInstance and it is exported (due to the pub keyword)
pub instance MyFooInstance Foo[Bar] {
  fn foo(self) -> () {

  }
}

}

module Main {

import A // this imports all public items, including MyFooInstance

fn someFunc[T: Foo[T]](value: T) {
  value.foo();
}

fn main() {
  let b = Bar();
  b.foo();
  someFunc(b);
}

}

```

The exact order of resolution is the following:
- module local instances have the highest priority
- imported instances have a slightly lower priority
- if all else fails then global, canonical instances are searched

In case there are multiple matching candidate instances (in any of the priority levels) then the resolution fails with instance ambiguity.
This system ensures that you have fine grained control over which instance(s) are used in which context. You do not have to worry about other modules creating unwanted instances.
You can easily create local specialized instances which do not affect the other parts of your program. We do not need complex algorithms to sort instances and try to figure out which one is 'more specialized' and you can write as many different instances as you want.

Additionally, you can still keep the same level of ease-of-use that you'd expect and there is no extra boilerplate or manually passing around instances.

### The Drop trait

There is a corner case in the system, the handling of instances for Drop. The Drop trait defines a type's destructor. The Drop trait behaves differently compared to other traits because the compiler can conjure up Drop implementations for types which do not have Drop instances. These functions are not bound to a scope
so using scope bound instances for Drop would not make any sense.
The solution Siko uses is that Drop instances must be canonical instances which I think even make sense conceptually. You really do not want multiple destructors for a type.
