# Effects

Effects are used to describe that the code wants to use an operation with given semantics and type but the implementation of the operation is unknown and will be decided later by the caller. Effects meant to be a way to inject functionality into code with very little boilerplate.
The idea behind effects is that libraries should use effects to describe all their interactions with the external world and let the users decide how to implement those interactions. The effect interface provides a type safe communication between the library author and the library user.

Effects can appear in the function type but usually they are not present and are inferred by the compiler. The idea is that introducing, changing or removing an effect should not be an activity that affects all function signatures in the call chain, only the effect user and the effect handler functions are affected.

A simple example

```Siko

effect Log where
    log :: String -> ()

someFunc :: () using (Log)
someFunc = do
    msg <- "Hello world"
    log msg

logConsole msg = println msg

main = do
    with { log = logConsole } do
        someFunc
```
In the example above the someFunc function uses the effect called Log. In the example the effect appears in its signature but this effect declaration is fully optional, the list of used effects can be inferred by the compiler.

The `with` block introduces an effect handler, it specifies that the log effect call must be handled by the call logConsole for everything inside the with block (including the someFunc call).

Effect handlers can be static or dynamic and effects can introduce types as well.

## Effect syntax

### Effect definition

Effects are defined using the `effect` keyword, otherwise they are very similar to type class definitions. This is not a coincidence. Effects are very similar to type classes, they define an interface, however effects are not bound to types, but scopes.

An effect definition:

```Siko

effect (Show a) => Factory a where
    create a :: a

```

The effect above defines a factory that has a single call called `create` which can create an instance of some type a that implements the interface of the Show typeclass. The effects user does not know what the returned type of a will be, only that it can be converted into a String (using Show).

### Declaring used effects in function signatures

```Siko

someFunc a :: Int -> String using (Factory a)
```

Effects in function signatures are declared using the `using` keyword. The type parameters of effects are part of the type parameter list of the function signature. Used effect declarations are optional part of a function signature.

### Defining handlers

```Siko

someFunc = do
    with { someOp = myOp } do
        otherCall
```

Effect handlers are defined using the `with` keyword, the `with` block contains a list of definitions. Each definition defines that a effect call is handled by the given handler.

## Static Effects

Static effects are effects with a statically dispatched handler, i.e. the compiler can decide, at compile time, which function will be called as the effect handler.

```Siko

import IO

effect FileOps where
    open :: String -> File
    read :: File -> String

someFunc :: String using (FileOps)
someFunc = do
    f <- open "my.txt"
    read f

main = do
    with { open = IO.openFile, read = IO.readFile } do
        println someFunc
```

In the above example, the `open` is defined to be handled by `IO.openFile` which is a statically known function's name without any argument, so the effect handler does not have any associated environment. Thus, this call can be statically dispatched, i.e. the `open` call in `someFunc` can be simply replaced by `IO.openFile` in the generated code. This type of effect call has zero runtime overhead, it is essentially a type safe search and replace.

## Dynamic Effects

Dynamic effects are effects with a runtime defined environment attached to the handler. In these cases, the compiler can not statically dispatch the handler at compile time.

```Siko

import IO

data Config = Config String

effect ConfigProvider where
    get :: () -> Config

someFunc :: String using (ConfigProvider)
someFunc = do
    Config c <- get ()
    c

main = do
    config <- Config "myConfig"
    with { get = \_ -> config } do
        println someFunc
```

In the above example, the `get` is defined to be handled by a closure which is a runtime defined entity with an associated environment (contains the value of config). Thus, this call can only be dynamically dispatched. In this scenario, the compiler injects the closure as a hidden argument to all affected function, i.e. `someFunc` will have an extra parameter that contains the closure which will be called by the `get` call at runtime.
