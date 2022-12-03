# Functions

Although Siko is an imperative programming language, it is heavily functional in its style, thus functions play a crucial role in Siko programs.

```Siko

id a :: a -> a
id a = a

factorial :: Int -> Int
factorial n = if n < 2 then 1 else n * factorial (n - 1)

factorial2 0 = 1
factorial2 n = n * factorial2 (n - 1)

```

The body of a function is an expression that is evaluated when the function is called and the value of the expression is the return value of the function.
