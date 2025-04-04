# View

This document provides an in-depth explanation of the view abstractions, which include the `View` interface and the `BaseView` abstract class.
These components are essential for rendering data and handling user interactions in an application.

## Table of Contents

[[toc]]

## Overview

The view abstractions are designed to facilitate the creation of views in an application. Views are responsible for:

- Rendering data into HTML elements.
- Handling user interactions through event callbacks.
- Acting as the visual representation of the application's data.

### Key Components

1. **View Interface**: Defines the structure for creating views.
2. **BaseView Abstract Class**: Provides a foundation for implementing views with default event-handling capabilities.

## View Interface

The `View` interface defines the contract for any view implementation. It ensures that all views provide methods for:

- Registering event callbacks.
- Rendering data into HTML elements.

### Methods

#### `onEvent<E extends keyof Event>(event: E, callback: Event[E]): void`

- **Description**: Registers a callback function to handle a specific event.
- **Parameters**:
  - `event`: The name of the event to listen for.
  - `callback`: The callback function to execute when the event is triggered.
- **Usage**:
  ```typescript
  view.onEvent('click', () => {
    console.log('Element clicked!');
  });
  ```

#### `render(data: Data): HTMLElement`

- **Description**: Renders the view using the provided data and returns the resulting HTML element.
- **Parameters**:
  - `data`: The data to be used for rendering the view.
- **Returns**: The root HTML element of the rendered view.
- **Usage**:
  ```typescript
  const element = view.render({ name: 'John' });
  document.body.appendChild(element);
  ```

## BaseView Abstract Class

The `BaseView` class provides a default implementation of the `View` interface. It simplifies the process of creating views by handling common functionality, such as event management.

### Properties

### Methods

#### `onEvent<E extends keyof Event>(event: E, callback: Event[E]): void`

- **Description**: Registers a callback function for a specific event.
- **Parameters**:
  - `event`: The name of the event to register the callback for.
  - `callback`: The callback function to handle the event.
- **Usage**:
  ```typescript
  view.onEvent('hover', () => {
    console.log('Element hovered!');
  });
  ```

#### `protected getHandler<E extends keyof Event>(event: E): Event[E]`

- **Description**: Retrieves the handler for a specific event. If no handler is registered, an empty function is returned.
- **Parameters**:
  - `event`: The name of the event to retrieve the handler for.
- **Returns**: The event handler function, or an empty function if no handler is registered.
- **Usage**:
  ```typescript
  class MyView extends BaseView<MyData, MyEvents> {
    // ...
    public render(data: MyData): HTMLElement {
      // ...
      element.addEventListener('click', () => {
        this.getHandler('click')();
      });
      // ...
    }
  }
  ```

#### `abstract render(data: Data): HTMLElement`

- **Description**: An abstract method that must be implemented by subclasses to render the view using the provided data.
- **Parameters**:
  - `data`: The data to be rendered by the view.
- **Returns**: An HTML element representing the rendered view.
- **Usage**:
  ```typescript
  class MyView extends BaseView<MyData, MyEvents> {
    // ...
    public render(data: MyData): HTMLElement {
      const element = document.createElement('div');
      element.textContent = `Hello, ${data.name}!`;
      return element;
    }
  }
  ```

## Example Usage

Below is an example of how to create a custom view by extending the `BaseView` class.

```typescript
import { BaseView } from './core';

interface MyData {
  name: string;
}

type MyEvents = {
  click: () => void;
};

class MyView extends BaseView<MyData, MyEvents> {
  public render(data: MyData): HTMLElement {
    const element = document.createElement('div');
    element.textContent = `Hello, ${data.name}!`;
    element.addEventListener('click', () => {
      this.getHandler('click')();
    });
    return element;
  }
}

// Usage
const view = new MyView();
view.onEvent('click', () => {
  console.log('Element clicked!');
});

const element = view.render({ name: 'John' });
document.body.appendChild(element);
```

## Key Benefits

- **Encapsulation**: Views encapsulate rendering logic, making the application easier to maintain.
- **Reusability**: The `BaseView` class provides reusable functionality, reducing boilerplate code.
- **Type Safety**: The use of generics ensures type safety for both data and events.
- **Flexibility**: The `View` interface allows for custom implementations tailored to specific needs.

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

## Don't save event handlers

> [!WARNING] Do not save the handlers returned by `getHandler` in variables. For example:
>
> ```typescript
> // Incorrect: Saving the handler in a variable
> const clickHandler = this.getHandler('click');
> element.addEventListener('click', clickHandler);
> ```
>
> If the event handler is updated later, the saved variable will not reflect the updated handler. Similarly, passing the handler directly in the listener is also considered saving the handler:
>
> ```typescript
> // Also Incorrect: Passing the handler directly
> element.addEventListener('click', this.getHandler('click'));
> ```
>
> Instead, always call `getHandler` within a function when adding event listeners:
>
> ```typescript
> // Correct: Using getHandler within a function
> element.addEventListener('click', () => {
>   this.getHandler('click')();
> });
> ```
>
> This ensures that the event listener always uses the most up-to-date handler.
