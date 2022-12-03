# Type classes

Type classes in Siko represent interfaces, it is a way to describe that a particular set of types support a set of operations.

```Siko
class ToString a where
    toString a :: a -> String
```

The type class above describes an interface where everything that implements it can be converted to a String. This is very similar to type classes
from Haskell or traits from Rust.

To describe that a given type implements a given type class an instance of that type class has to be defined for the given type.

```Siko
data Person = { name :: String }

instance ToString Person where
    toString person = person.name
```

Siko currently supports single parameter type classes and non overlapping instances.

Type classes support associated types (similar to Rust's associated types), they are defined using the `>` character.

```Siko
class Iterator a > b where
   next a b :: a -> (a, Option b)

```

