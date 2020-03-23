---
date: 2020-03-22
title: Modules in files
description: Rust modules separated into files
categories: [Modules]
tags: [basics]
set: Modules
set_order: 3
---
## Create a module in its own file
Create your application as described in the post [Create a simple application]({% post_url 2020-03-22-simple-app %}).

Adding all modules to `lib.rs` might get cumbersome so it's nice to break them out into their own file.

Put your module in `separatefile.rs`:
```text
.
├── src
    ├── lib.rs
    ├── main.rs
    └── separatefile.rs
```

Filename src/lib.rs:
```
#[allow(dead_code)]
pub mod separatefile;
```
Notes:
* We allow dead code here, because most of the code is unused.

Filename src/main.rs:
```
#[allow(unused_imports)]
use myapps::separatefile;

fn main() {
}
```
Notes:
* We allow unused imports here, because this is just an empty example.

Filename src/separatefile.rs
```
mod separatefile {
  // Implement something
}
```
