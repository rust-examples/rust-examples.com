---
date: 2020-03-22
title: A simple module
description: Rust modules simple module using lib.rs
categories: [Modules]
tags: [basics]
set: Modules
set_order: 2
---
Create your application as described in the post [Create a simple application]({% post_url 2020-03-22-simple-app %}).

Put your module in `lib.rs`:
```text
.
├── src
    ├── lib.rs
    └── main.rs
```

Filename src/lib.rs:
```
#[allow(dead_code)]
pub mod module1 {
    mod private_submodule1 {
        pub fn public_function_in_a_private_module() {
            println!("Some internal calculations.");
        }
    }

    pub mod public_submodule {
        fn private_function() {}
        pub fn public_function() {
            println!("Public function executed.");
        }
        pub fn get_some_internal_calculations() {
            super::private_submodule1::public_function_in_a_private_module()
        }
        pub fn public_function_with_too_common_or_weird_name() {
            println!("All is well!");
        }
    }
}

pub fn some_public_function() {
    crate::module1::public_submodule::public_function()
}
```
Notes:
* We allow dead code here, because some functions are just for show.

Filename src/main.rs:
```
use myapps::module1::public_submodule::public_function_with_too_common_or_weird_name as papperlapapp;

fn main() {
    println!("Hello modules!");
    myapps::module1::public_submodule::public_function();

    use myapps::module1::public_submodule;
    public_submodule::get_some_internal_calculations();

    papperlapapp();
}
```
Notes:
* `use` is usually at the top of the file.

