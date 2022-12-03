# Memory management

Siko being a runtime agnostic programming language, its memory management solution must be as barebone as possible.
Other programming languages with heavy runtimes usually provide garbage collection solutions which have a global side effect. Every value in the system is affected by this decision, being a garbage collected language is a global property. The idea behind Siko's memory management is to get rid of this runtime dependent global property. The only global property values in Siko have is that they exist. Of course, they can have other properties, depending on their type, but none of the properties are true for every value in the program. Because Siko is not a low level system language, we do not have the need to be able to create pointers to every value in the program or to be able to meticulously define the storage type of every value. This gives freedom to the compiler to decide the details and freedom to the user to not care as much. On the other hand, nobody wants a slow language so the compiler must be able to generate code that is quite performant.

The exact memory management strategy used by the Siko compiler is that every value is moved at their last use and borrowed at every previous use.

```Siko
data Person = { name :: String } deriving (Show)

main = do
    john <- Person "John Wick"
    println john
    println john
    println john
```
In this particular example, the value "John Wick" is created when the constructor of Person is called and since that is the last use of the value,
the String is moved into the Person record. The john value is used 3 times, two of those will receive a borrowed john, the last one receives an owned version.

It is very much possible that a value is still being borrowed while their last use will move them. The Siko compiler tracks all borrows and promotes those affected borrows to owned values to avoid use after free bugs at runtime. This tracking is completely done at compile time for the whole program and does not require runtime support.
