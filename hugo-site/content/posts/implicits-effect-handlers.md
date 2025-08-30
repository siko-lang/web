+++
date = '2025-08-20T00:00:00+02:00'
draft = false
title = 'Implicits and effect handlers'
+++

Siko now supports **implicits** and **effect handlers**.
Because it may not be obvious what these features do and more importantly how they are implemented,
we will look into them using a simple teletype example. Without much further ado, let's dive into the code.
Here is the full example and we will explore it in detail afterwards.

```siko
module TeleType {

pub effect TeleType {
  fn readLine() -> String
  fn println(input: &String)
}

pub fn run() {
  while True {
    let input = readLine();
    if input == "exit" {
      break;
    }
    println("You said: " + input);
  }
}

}

module Main {

import TeleType as T

implicit mut state: Int

fn mockReadLine() -> String {
  if state < 3 {
    state += 1;
    "mocked: ${state}"
  } else {
    "exit".toString()
  }
}

fn mockPrintln(input: &String) {
  let expectedString = "You said: mocked: ${state}";
  assert(expectedString == input);
}

fn testTeleType() {
  let mut state = 0;
  with T.println = mockPrintln,
     T.readLine = mockReadLine,
     state = state {
    T.run();
  }
}

fn realTeleType() {
  println("Starting teletype");
  with T.println = println,
       T.readLine = readLine {
    T.run();
  }
}

fn main() {
  testTeleType();
  realTeleType();
}

}
```

The example program defines a single TeleType effect that allows for reading and writing to the console in a
controlled manner. The effect definition looks similar to a trait definition because it acts as an interface
but in contrast to instances (the trait implementations), effects are not handled globally, their actual
implementation is context dependent. The execution context of a code block determines how the effect is handled.
In other words, the effect acts as a hole in the program, allowing the caller to control what happens when
an effect is called.
Because Siko is a low level programming language, it does not have a language
specific runtime, it does not do stack juggling in a way that you would expect if you heard about algebraic
effects previously.

In Siko, effects are statically resolved at compile time and every function that uses an effect is monomorphized
to a specific implementation of the effect. In the actual compiled code, there are no runtime
checks or dynamic dispatch involved when dealing with effects. In the case of the teletype example, the teletype
loop is compiled twice, once for testing and once for real execution. When the monomorphizer encounters a
*with* block it updates the effect handlers in the current context, so that whenever an effect call is encountered, the
selected implementation will simply replace the effect call. This is as static as it gets, the function call is
literally just replaced. Obviously, everything is type checked and the monomorphizer will complain if
the effect is not handled properly, i.e. the current context does not provide an implementation for an
encountered effect call.

So far so good, but you may be wondering: the usability of this is questionable because it is not
possible to attach state to the effect calls. That's where implicits come into play! Similarly to effects, implicits are also
context dependent, but they are not functions, rather they are variables that can be used in the current context. They don't
provide functionality, they provide state. In the example, we define an implicit variable named *state* that keeps
track of the current state of the test executor. Implicits are bound to local variables using the with block,
similarly to effects. Every code in that execution context (arbitrarily deep in the callchain) that wants to use the implicit
variable can do so and will use the bound local variable behind the scenes. As you can see, the actual teletype implementation is not aware of
the test code injecting state into the loop. Implicits can be immutable and mutable. Implicits are compiled away
into an implicitly passed context parameter. The context variable contains a list of implicits in the current execution
context and each access to the implicit is replaced by accessing the correct member of the context variable.

I find both implicits and effect handlers a clean abstraction but there are still open design questions.
For example, Siko currently does not have closures but I want to introduce them and their interaction with
effects and implicits is not yet clear.
