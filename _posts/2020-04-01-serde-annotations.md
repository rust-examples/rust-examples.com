---
date: 2020-04-01
title: How to use Serde annotations for serialization and deserialization
description: Rust serde annotations
categories: [Serde]
tags: [basics]
set: Serde
set_order: 2
---
Create your application as described in the post [Create a simple application]({% post_url 2020-03-22-simple-app %}).

Add to your `Config.toml`
```toml
[dependencies]
serde = "1.0.105"
serde_json = "1.0.50"
serde_derive = "1.0.105"
```

Read the comments of `BiggerStruct` to see the examples of serde annotations.

Filename `src/main.rs`:
```
use serde_derive::{Deserialize, Serialize};
use serde_json;

// A smaller struct used as a map in JSON.
#[derive(Serialize, Deserialize)]
struct MyStruct {
    somestring: String,
    someint: u64,
}

// A custom field that can take different types of values
// serde(untagged) makes JSON oblivious to which type it is
#[derive(Serialize, Deserialize)]
#[serde(untagged)]
enum Mixed {
    Str(String),
    Num(u64),
    None,
}

// The JSON struct that we are going to serialize/deserialize.
// Note the different fields and annotations.
#[derive(Serialize, Deserialize)]
struct BiggerStruct {
    // A struct (map) field. This one cannot be null or omitted.
    // Implement the Default trait for the struct and then you can omit it.
    mystruct: MyStruct,

    // Anything that has a default trait defined can be omitted in the JSON as long as it is mentioned
    // to serde. Note the `Option` below, that doesn't need to do this.
    #[serde(default)]
    canbeomitted: u64,

    // Apparently, `Option`s don't need to be explicitly stated to have defaults and they can also be omitted.
    thisisanoption: Option<i64>,

    // A type that's using one of its functions to define a default value.
    // Now, if its omitted, it's going to default to an empty string.
    // Note: you can use a regular function here too, that's defined in your code.
    #[serde(default = "String::new")]
    cenbeemptystring: String,

    // A field that can be either string, integer or null (like the JSON ID specification)
    // Note that the None value it translates to is defined in the enum.
    // This one doesn't need to be an `Option` to accept its own null value.
    // The Default trait is not implemented for the enum, so it cannot be omitted.
    mixed: Mixed,

    // Let's not serialize/deserialize this field
    #[serde(skip)]
    internalvalue: i64,

    // Let not serialize this field if it would be `null`.
    #[serde(skip_serializing_if = "Option::is_none")]
    dontserialifnull: Option<i64>,

}

fn main() {
    // Deserialize with annotations

    let incomingadvanced = r#"
    {
      "mystruct": {
        "somestring": "World",
        "someint": 42
      },
      "mixed": null,
      "internalvalue": 100
    }
    "#;

    let advancedresult: BiggerStruct = serde_json::from_str(&incomingadvanced).unwrap();
    println!("Somestring: {}", advancedresult.mystruct.somestring);
    println!(
        "Omitted value takes its default: {}",
        advancedresult.canbeomitted
    );
    println!(
        "Thisisanoption is null?: {}.",
        advancedresult.thisisanoption.is_none()
    );
    println!(
        "The same is true for the omitted string: '{}'",
        advancedresult.cenbeemptystring
    );
    match advancedresult.mixed {
        Mixed::None => println!("Mixed value is None."),
        Mixed::Str(s) => println!("Mixed value is String: {}", s),
        Mixed::Num(n) => println!("Mixed value is Number: {}", n),
    }
    println!(
        "Finally, internalvalue was initialized with its Default trait and not from the JSON: {}",
        advancedresult.internalvalue
    );

    // Serialize with annotations

    // Note when using `Option`, you need Some(value) to define a value.
    // In the Mixed enum, you need its own type to define a value:
    //   `mixed: Mixed::Str("hello".to_string())` or
    //   `mixed: Mixed::Num(5)` or
    //   `mixed: Mixed::None` .
    let data = BiggerStruct {
        mystruct: MyStruct {
            somestring: "mystring".to_string(),
            someint: 1,
        },
        canbeomitted: 1,
        thisisanoption: Some(-1),
        cenbeemptystring: "notempty".to_string(),
        mixed: Mixed::None,
        internalvalue: -100,
        dontserialifnull: None,
    };
    println!("Serialized: {}", serde_json::to_string(&data).unwrap());
    // Prints: Serialized: {"mystruct":{"somestring":"mystring","someint":1},"canbeomitted":1,"thisisanoption":-1,"cenbeemptystring":"notempty","mixed":null}
}
```
