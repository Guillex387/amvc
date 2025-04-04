# Controller

This document provides an in-depth explanation of the controller abstractions, which include the `Controller` interface and the `BaseController` abstract class. These components are essential for managing the logic and behavior of specific parts of an application.

## Table of Contents

[[toc]]

## Overview

The controller abstractions are designed to facilitate the creation of controllers in an application. Controllers are responsible for:

- Managing application logic.
- Coordinating updates to the user interface (UI).
- Handling events between `models` and `views`.

### Key Components

1. **Controller Interface**: Defines the structure for creating controllers.
2. **BaseController Abstract Class**: Provides a foundation for implementing controllers with default behavior.

## Controller Interface

The `Controller` interface defines the contract for any controller implementation. It ensures that all controllers provide methods for:

- Registering update callbacks.
- Executing the main logic.

### Methods

#### `onUpdate(callback: (element: HTMLElement) => void): void`

- **Description**: Registers a callback function to handle updates to the controller's rendered element.
- **Parameters**:
  - `callback`: A function that receives an `HTMLElement` to be rendered or updated.
- **Usage**:
  ```typescript
  const controller = new MyController(model, view);
  controller.onUpdate((element) => {
    document.body.innerHTML = '';
    document.body.appendChild(element);
  });
  ```

#### `run(): void`

- **Description**: Executes the main logic of the controller. This method must be implemented by concrete classes to define specific behavior.
- **Usage**:

  ```typescript
  const controller = new MyController(model, view);
  controller.onUpdate((element) => {
    document.body.innerHTML = '';
    document.body.appendChild(element);
  });
  controller.run();
  ```

## BaseController Abstract Class

The `BaseController` class provides a default implementation of the `Controller` interface. It simplifies the process of creating controllers by handling common functionality.

### Properties

#### `protected render: (element: HTMLElement) => void`

- **Description**: A function used to render or update the controller's element. This is set via the `onUpdate` method.
- **Usage**:

  ```typescript
  class MyController extends BaseController {
    // ...

    // The render method is commonly used in the run method implementation
    public run(): void {
      this.model.fetchData().then((data) => {
        const element = this.view.render(data);
        this.render(element);
      });
    }
  }
  ```

### Methods

#### `onUpdate(callback: (element: HTMLElement) => void): void`

- **Description**: Registers a callback function to handle updates to the controller's rendered element.
- **Parameters**:
  - `callback`: A function that receives an `HTMLElement` to be rendered or updated.

#### `abstract run(): void`

- **Description**: Executes the main logic of the controller. Subclasses must implement this method to define specific behavior.

## Example Usage

Below is an example of how to create a custom controller by extending the `BaseController` class.

```typescript
import { MyView } from './my-view';
import { MyModel } from './my-model';

class MyController extends BaseController {
  private async handleClick() {
    const { name } = await this.model.fetchData();
    const message = this.model.handle('greet', name);
    alert(message);
  }

  public constructor(private model: MyModel, private view: MyView) {
    super();
    this.view.onEvent('click', () => this.handleClick());
  }

  public run(): void {
    this.model.fetchData().then((data) => {
      const element = this.view.render(data);
      this.render(element);
    });
  }
}

// Usage
const model = new MyModel();
const view = new MyView();
const controller = new MyController(model, view);
controller.onUpdate((element) => {
  document.body.innerHTML = '';
  document.body.appendChild(element);
});
controller.run();
```

## Key Benefits

- **Encapsulation**: Controllers encapsulate logic, making the application easier to maintain.
- **Reusability**: The `BaseController` class provides reusable functionality, reducing boilerplate code.
- **Flexibility**: The `Controller` interface allows for custom implementations tailored to specific needs.

## Use interfaces in the controller for better abstraction

> [!TIP] By depending on interfaces for models and views, controllers can support multiple views, making them interchangeable. Below is an example:
>
> ```typescript
> import type { View, Model } from './core';
> import { MyModel } from './my-model';
> import { MyView1, MyView2 } from './my-view';
>
> type MyModelLike = Model<
>   { id: number; name: string },
>   { greet: (name: string) => string }
> >;
>
> type MyViewLike = View<{ name: string }, { click: () => void }>;
>
> class MyController extends BaseController {
>   private async handleClick() {
>     const { name } = await this.model.fetchData();
>     const message = this.model.handle('greet', name);
>     alert(message);
>   }
>
>   public constructor(private model: MyModelLike, private view: MyViewLike) {
>     super();
>     this.view.onEvent('click', () => this.handleClick());
>   }
>
>   public run(): void {
>     this.model.fetchData().then((data) => {
>       const element = this.view.render(data);
>       this.render(element);
>     });
>   }
> }
>
> const model = new MyModel();
> const view1 = new MyView1();
> const view2 = new MyView2();
> const controller = new MyController(model, view1);
> controller.onUpdate((element) => {
>   document.body.innerHTML = '';
>   document.body.appendChild(element);
> });
> controller.run();
> ```
>
> This approach enhances flexibility by allowing the controller to work with any view or model that adheres to the defined interfaces.
> Now if you want to change the view now only pass it other in the constructor:
>
> ```typescript
> const view1 = new MyView1();
> const view2 = new MyView2();
>
> const controller = new MyController(model, view1); // [!code --]
> const controller = new MyController(model, view2); // [!code ++]
> ```
