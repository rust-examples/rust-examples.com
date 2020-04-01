---
date: 2020-03-22
title: Modules summary
description: High-level modules overview
categories: [Modules]
tags: [basics]
set: Modules
set_order: 1
---
[![Crates and packages](/assets/images/crates_and_packages.png)](/assets/images/crates_and_packages.png){:data-lightbox="lightbox"}
Folder structure:
```text
.
├── src
    ├── separatedir
    │   └── mod.rs
    ├── separatefileanddir
    │   └── separatefileanddir.rs
    ├── lib.rs
    ├── main.rs
    ├── separatefile.rs
    └── separatefileanddir.rs
```

From the documentation:
* **Packages:** A Cargo feature that lets you build, test, and share crates
* **Crates:** A tree of modules that produces a library or executable
* **Modules and use:** Let you control the organization, scope, and privacy of paths
* **Paths:** A way of naming an item, such as a struct, function, or module
