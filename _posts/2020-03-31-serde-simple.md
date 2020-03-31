---
date: 2020-03-31
title: Serde simple serialization and deserialization
description: Rust simple serialization example
categories: [Serde]
tags: [basics]
set: Serde
set_order: 1
---
## Deserialize JSON into simple struct
Create your application as described in the post [Create a simple application]({% post_url 2020-03-22-simple-app %}).

Add to your `Config.toml`
```toml
[dependencies]
serde = "1.0.105"
serde_json = "1.0.50"
serde_derive = "1.0.105"
```

```
use serde_json;
use serde_derive::Deserialize;

// You'll need the `Deserialize` trait on your struct so serde can deserialize it.
#[derive(Deserialize)]
struct MyStruct {
    somestring: String,
    someint: u64,
}

fn main() {

    // Note: use r#"string"# for raw strings with double-quotes
    let incoming = r#"
    {
      "somestring": "Hello",
      "someint": 4
    }
    "#;

    // The type of the variable is explicitly given because serde doesn't know by itself what type to use.
    let result: MyStruct = serde_json::from_str(incoming).unwrap();

    // Use the resulting structure.
    println!("{}", result.somestring);
    println!("{}", result.someint);

}
```

## Serialize JSON from a simple struct
Create your application as described in the post [Create a simple application]({% post_url 2020-03-22-simple-app %}).

Add to your `Config.toml`
```toml
[dependencies]
serde_json = "1.0.50"
serde_derive = "1.0.105"
```

```
use serde_json;
use serde_derive::Serialize;

// You'll need the `Serialize` trait on your struct so serde can serialize it.
#[derive(Serialize)]
struct MyStruct {
    somestring: String,
    someint: u64,
}

fn main() {

    let data = MyStruct {
        somestring: "mystring".to_string(),
        someint: 42,
    };

    println!("{}", serde_json::to_string(&data).unwrap());
    // Prints: {"somestring":"mystring","someint":42}

}
```