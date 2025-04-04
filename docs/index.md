# amvc - Abstract MVC

**amvc** is a lightweight [typeScript](https://www.typescriptlang.org/) library that provides interfaces and base classes to implement the [Model-View-Controller (MVC)](https://developer.mozilla.org/en-US/docs/Glossary/MVC) architecture. It is designed to be fully type-safe, ensuring robust and maintainable code for your applications.

This library was developed during the PAI (Programación de Aplicaciones Interactivas) course taught by [Professor Francisco de Sande](https://github.com/fsande) at the University of La Laguna. Its purpose is to facilitate faster and more flexible development in the laboratory practices of the course 2024-2025.

> [!IMPORTANT] This library is written for learning purposes and is not intended for large-scale developments. However, it can be an interesting choice for small projects.

## Table of Contents

[[toc]]

## Installation

The library is designed to be simple. To use it, you only need to copy the `core/` folder from this repository into your project.
To do this quickly:

```bash
# change to your src/
cd <my-project>/src/
git clone --branch core --single-branch https://github.com/guillex387/amvc.git
```

This command will create a `core/` folder in your `src/`.
And only you need to import the core, and you have all the library items:

```typescript
import { View, BaseView } from './core';

// ...
```

## Getting started

The **amvc** library provides the components to implement the MVC architecture:

1. [Model](/model): Handles the application's data and business logic.
2. [View](/view): Manages the user interface and user interactions.
3. [Controller](/controller): Acts as the intermediary between the Model and the View.

## Examples

This repository includes example projects to demonstrate how to use the **amvc** library. These examples can serve as a starting point for your own projects or as a reference for implementing specific features.

### Todo Example

The `todo-example` demonstrates a simple Todo application built using the **amvc** library. It showcases how to:

- Define a `Model` to manage the application's data.
- Create a `View` to render the user interface and handle user interactions.
- Implement a `Controller` to coordinate the logic between the `Model` and `View`.

You can find the example in the `examples/todo-example` folder of this repository.

## License

amvc Copyright (c) 2025 Guillermo Silva González. All rights reserved.

Licensed under the [MIT license](/LICENSE).
