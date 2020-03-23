---
date: 2020-03-22
title: Modules in directories
description: Rust modules separated into their own directories
categories: [Modules]
tags: [basics]
set: Modules
set_order: 4
---
## Create a module in its own directory with mod.rs
Create your application as described in the post [Create a simple application]({% post_url 2020-03-22-simple-app %}).

Having a lot of files in the `src/` folder might get cumbersome, so it's nice to break them out into their own folder.

```text
.
├── src
    ├── separatedir
        └── mod.rs
    ├── lib.rs
    └── main.rs
```

Filename src/separatedir/mod.rs
```
pub mod separatedir {
  // Implement something
}
```

Filename src/lib.rs
```
pub mod separatedir;

```

Filename src/main.rs
```
#[allow(unused_imports)]
use myapps::separatedir;

fn main() {
}
```

---
## Create a module in its own directory without mod.rs
The use of `mod.rs` seems to go out of style. Here's an alternative way to achieve the same results.

```text
.
├── src
    ├── separatefileanddir
        └── separatefileanddir.rs
    ├── lib.rs
    ├── main.rs
    └── separatefileanddir.rs
```

Filename src/separatefileanddir/separatefileanddir.rs
```
pub mod separatefileanddir {
  // Implement something
}
```

Filename src/lib.rs
```
pub mod separatefileanddir;

```

Filename src/main.rs
```
#[allow(unused_imports)]
use myapps::separatefileanddir;

fn main() {
}
```

Filename src/separatefileanddir.rs
```
mod separatefileanddir;
```
