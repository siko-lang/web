---
title: "Modules"
date: 2025-10-24
draft: false
weight: 1
---

In Siko, every line of code is in a module, that is the unit of organization. Modules are defined using the module keyword.

```siko
module MyModule {

pub fn publicFunction() {
  // visible outside module
}

fn privateFunction() {
  // only visible within module
}

}
```

A single file can contain multiple module, just write them one after another. Modules cannot be nested, each module is at the same level, together they build up the whole program. The module Main has a special role, it contains the main function, which is the entry point of the program.

Everything you define must be in a module, all data types and functions, effects, traits, instances, etc.

All items defined directly in the module is module local, nothing outside the module can refer to those datatypes, use those functions or traits, effects, sometimes even instances (see named instances). If you want it to be usable outside, you need to export it using the pub keyword on the item you want to export.

Exported items do not appear magically inside other modules, (in most cases) you need to explicitly import the source module.

```siko
module Main {

import MyModule

fn main() {
  MyModule.publicFunction();
}

}
```

By default, the import will bring all public definitions into the local namespace with various aliases:
- the item will be available by its own name. A function named publicFunction can be called by calling publicFunction().
- the item will be available by its qualified name, which for top level items is the module_name.item_name. In the previous example, the MyModule.publicFunction is a qualified name.
- enum variants are available by 3 names: the variant name itself, the enum_name.variant_name and finally, the module_name.enum_name.variant_name.
For example, the names True, Bool.True and Bool.Bool.True refer to the same variant, because the Bool enum is defined in the Bool module.

If any alias can refer to multiple items then that alias is ambiguous and cannot be used in that context. If it is not used, the compiler does not complain though. This means that you are free to use as fine grained scoping as you want in a given context as long as it is not ambiguous. You can use True and False as long as it is not ambiguous in the given context.

Sometimes you want to use an alias for a long module name or want to use an otherwise ambiguous name without fully qualifying it with a possible long module name so you can import modules using an alias.

Import with an alias:

```siko
import MyModule as M

fn main() {
  M.publicFunction();
}
```

When using a module alias, the unqualified item aliases are not brought into the local namespace, only qualified ones and instead of the original source module name, the defined module alias will be used. In the example above, the M.publicFunction refers to the publicFunction function in the MyModule that is given the alias M in the current context.

Although the module system is flat, meaning there is NO module hierarchy whatsoever, the module names can contain dots, so you can give them more meaningful names. However, keep in mind that modules Foo and Foo.Bar are NOT related in any way, they just happen to have the same prefix. Naming the modules correctly is recommended as that helps building the correct mental model of the program.

The compiler does not care about filenames or folder hierarchy, any module can be in any file but naming the folders and files to unrelated, misleading names is counterproductive and not recommended.

There are special modules in the standard library, marked with the @prelude attribute, which are automatically imported by every other module. These are basic types/utilities which are usually needed, like the previously mentioned True. You do not have to manually write import Bool every time you want to write True.

If you want to mark your own module as @prelude you are free to do so, it will behave the same way, bringing those public items into every other module. You can build up your own project specific prelude.

If you want to define an item with the same name as some other item from one of the modules that you import but you do not actually want to use that imported item (it just happened to come with the other useful stuff) and do not want to refer to your local item with its fully qualified name then you can relax, the name resolution system uses a priority sytem. A local name always trumps an imported name and an imported name trumps an implicitly imported name (something that comes from the prelude imports).