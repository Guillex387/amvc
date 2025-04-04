# Model

This document provides an in-depth explanation of model abstractions, which include the `Model` interface and the `BaseModel` abstract class. These components are essential for managing application data, handling events, and implementing business logic.

## Table of Contents

[[toc]]

## Overview

The model abstractions are designed to facilitate the creation of models in an application. Models are responsible for:

- Managing application data and business logic.
- Handling custom events.
- Fetching and processing data asynchronously.

### Key Components

1. **Model Interface**: Defines the structure for creating models.
2. **BaseModel Abstract Class**: Provides a foundation for implementing models with default event-handling capabilities.

## Model Interface

The `Model` interface defines the contract for any model implementation. It ensures that all models provide methods for:

- Handling custom events.
- Fetching data asynchronously.

### Methods

#### `handle<E extends keyof Event>(event: E, ...params: Parameters<Event[E]>): ReturnType<Event[E]>`

- **Description**: Handles a specific event by invoking the corresponding handler function.
- **Parameters**:
  - `event`: The name of the event to handle.
  - `params`: The parameters to pass to the event handler function.
- **Returns**: The return value of the event handler function.
- **Usage**:
  ```typescript
  model.handle('greet', 'John');
  ```

#### `fetchData(): Promise<Data>`

- **Description**: Fetches the data associated with the model.
- **Returns**: A promise that resolves to the data of type `Data`.
- **Usage**:
  ```typescript
  model.fetchData().then((data) => {
    console.log(data);
  });
  ```

## BaseModel Abstract Class

The `BaseModel` class provides a default implementation of the `Model` interface. It simplifies the process of creating models by handling common functionality, such as event management.

### Properties

#### `private handlers: Event`

- **Description**: An object containing event handlers, where each key corresponds to an event name and its value is the associated handler function.
- **Usage**:

  ```typescript
  class MyModel extends BaseModel<MyData, MyEvents> {
    private handleGreet(name: string): string {
      return `Hello, ${name}!`;
    }

    public constructor() {
      super({
        greet: (name) => this.handleGreet(name),
      });
    }
    // ...
  }
  ```

### Methods

#### `handle<E extends keyof Event>(event: E, ...params: Parameters<Event[E]>): ReturnType<Event[E]>`

- **Description**: Invokes the handler for a specified event with the provided parameters.
- **Parameters**:
  - `event`: The name of the event to handle.
  - `params`: The parameters to pass to the event handler.
- **Returns**: The return value of the event handler.
- **Usage**:
  ```typescript
  model.handle('greet', 'Alice');
  ```

#### `abstract fetchData(): Promise<Data>`

- **Description**: An abstract method that must be implemented by subclasses to fetch data of type `Data`.
- **Returns**: A promise that resolves to the data of type `Data`.
- **Usage**:
  ```typescript
  class MyModel extends BaseModel<MyData, MyEvents> {
    // ...
    public async fetchData(): Promise<MyData> {
      return { id: 1, name: 'Sample Data' };
    }
  }
  ```

## Example Usage

Below is an example of how to create a custom model by extending the `BaseModel` class.

```typescript
import { BaseModel } from './core';

interface MyData {
  id: number;
  name: string;
}

type MyEvents = {
  greet: (name: string) => string;
};

class MyModel extends BaseModel<MyData, MyEvents> {
  private handleGreet(name: string): string {
    return `Hello, ${name}!`;
  }

  public constructor() {
    super({
      greet: (name) => this.handleGreet(name),
    });
  }

  public async fetchData(): Promise<MyData> {
    return { id: 1, name: 'Sample Data' };
  }
}

const model = new MyModel();

model.handle('greet', 'John'); // Output: "Hello, John!"
model.fetchData().then((data) => console.log(data)); // Output: { id: 1, name: 'Sample Data' }
```

## Key Benefits

- **Encapsulation**: Models encapsulate data and business logic, making the application easier to maintain.
- **Reusability**: The `BaseModel` class provides reusable functionality, reducing boilerplate code.
- **Type Safety**: The use of generics ensures type safety for both data and events.
- **Flexibility**: The `Model` interface allows for custom implementations tailored to specific needs.

## Always define event types with type

> [!CAUTION] When defining the event types for `BaseModel` and `BaseView`, always use the `type` keyword instead of `interface`. This ensures compatibility with the library's type constraints and avoids potential issues with type merging.
>
> ```typescript
> // Incorrect: Using `interface` for event types
> interface MyEvents {
>   greet: (name: string) => string;
> }
>
> // Correct: Using `type` for event types
> type MyEvents = {
>   greet: (name: string) => string;
> };
> ```
