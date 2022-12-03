# Expressions

The body of a function is an expression that is evaluated when the function is called and the value of the expression is the return value of the function.

### Expressions

#### do

```Siko

foo = do
    msg <- "Hello world"
    println msg

```

The `do` expression is a syntactic equivalent of a normal imperative block. It starts with the `do` keyword and contains one or more expressions which are evaluated in order. Additionally, `do` blocks also provide scoping for name bindings. The return value of a `do` block is the value of the last expression in the block.

#### bind

```Siko

foo = do
    (a, b) <- (1, 'a')

```

The bind expression binds the value of the expression on the right hand side to the pattern on the left hand side and they are separated by the `<-` symbol. Only irrefutable patterns are allowed in bind expressions. The return value of a bind expression is `()`.

### function application

The function application expression calls a function with the given arguments, evaluating to the return value of the function call.

```Siko

id a = a

foo = id 1

```

Functions are curried, partial function application has no special syntax.

```Siko

adder a b = a + b

foo = do
    f <- adder 1
    res <- f 2

```

### literals

```Siko

literals = do
    i1 <- -1
    i2 <- 123
    pi <- 3.14
    msg <- "Hello world"
    char <- 'a'
    tuple <- (i1, '4', ("another",), ())

```

### if

The `if` expression can be used to create conditional expressions, the `else` block is always required. The `if` expression evaluates either the true branch or the false branch and returns the value of the selected branch.

```Siko

isLarge n = if n > 10 then True else False

```

### case

The `case` expression is used for pattern matching on values. The `case` expression evaluates the first branch that matches the value and returns the value of the expression in the selected branch.

```Siko

isLarge n = case n of
    1 -> False
    n if n <= 10 -> False
    _ -> True

```

### record field access

To access a field of a record, use a `.` followed by the name of the field. The value of the record field access expression is the value of the field.

```Siko

data Person = { name :: String, age :: Int }

getAge :: Person -> Int
getAge p = p.age

```

### tuple field access

To access a field of a tuple, use a `.` followed by the index of the field. The value of the tuple field access expression is the value of the field.


```Siko

second a b :: (a, b) -> b
second t = t.1

```

### lambda

The lambda expression is an unnamed function definition that evaluates to a function. The lambda expression starts with a `\` followed by the
lambda arguments then a `->` followed by an expression that is the body of the lambda function.

```Siko

test = do
    f <- \x, y -> x + y
    f 2 3

```

### return

The `return` expression stops the execution of the current function and returns the value of the expression given as the argument.

```Siko

test = return ()

```

### loop

The `loop` expression resembles an imperative loop. It has a pattern, an initializer expression and a body.
The loop is started by evaluating the initializer expression, its value is then matched with the given pattern and then the body is executed once. After the execution, the value of the body is matched with the given pattern and the body is executed again, forever.

```Siko

loopTest =
    loop index <- 1 do
        print "Cycle count {}" % index
        index + 1
```

### break

The `break` expression jumps out of the current `loop` and the return value of the loop will be the value of the expression given as the argument of break.

```Siko

loopTest = loop index <- 1 do
        print "Cycle count {}" % index
        if index > 10
            then break ()
            else index + 1
```

### continue

The `continue` expression jumps out of the current `loop` body and the loop's current value will be the value of the expression given as the argument of continue.

```Siko

loopTest = loop index <- 1 do
        print "Cycle count {}" % index
        if index > 10
            then continue 0
            else index + 1
```

### try

The `try` expression evaluates its argument and 'unwraps' it, in case of failure the value is returned. It is currently sugar for a simple case.

```
    ok_value <- try fallibleOperation

    ok_value <- case fallibleOperation of
        Ok v -> v
        Err e -> return e
```

### Patterns

#TODO
