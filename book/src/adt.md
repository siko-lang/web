# Algebraic data types

Algebraic data types are defined using the ```data``` keyword.

```Siko

data Month = January
           | February
           | March
           | TheOthers

data Expr = Lit Int
          | Sum Expr Expr
          | Mul Expr Expr

```

Types can be generic:

```Siko

data Option a = Some a | None

```
