/**
 * ## Model and BaseModel Overview
 *
 * The `Model` interface and `BaseModel` abstract class are designed to define
 * and implement a structure for handling events and fetching data in a type-safe manner.
 * These constructs are particularly useful in scenarios where you need to manage
 * event-driven logic and asynchronous data fetching in a strongly-typed way.
 *
 * ### Key Points
 * - **Event Handling**: The `BaseModel` class allows you to define and handle custom events for your application.
 * - **Data Management**: Models are responsible for managing the application's data and business logic.
 * - **Type Safety**: The `BaseModel` ensures type safety for both data and events.
 * - **Data Fetching**: Implement the `fetchData` method to retrieve and manage data asynchronously.
 */

import type { EventMap } from './event-map';

/**
 * Represents a generic model interface that provides methods for handling events
 * and fetching data.
 *
 * @template Data - The type of data that the model represents.
 * @template Event - A mapping of event names to their corresponding handler functions.
 */
export interface Model<Data, Event extends EventMap> {
  /**
   * Handles a specific event by invoking the corresponding handler function.
   *
   * @param event - The name of the event to handle.
   * @param params - The parameters to pass to the event handler function.
   * @returns The return value of the event handler function.
   */
  handle<E extends keyof Event>(
    event: E,
    ...params: Parameters<Event[E]>
  ): ReturnType<Event[E]>;

  /**
   * Fetches the data associated with the model.
   *
   * @returns A promise that resolves to the data of type `Data`.
   */
  fetchData(): Promise<Data>;
}

/**
 * An abstract base class that provides a foundation for creating models
 * with event handling capabilities. This class is generic and can be
 * extended to define specific models with custom data types and event maps.
 *
 * @template Data - The type of data that the model will handle.
 * @template Event - An optional event map that defines the structure of events
 *                   and their corresponding handler signatures. Defaults to an
 *                   empty object.
 *
 * @implements Model<Data, Event>
 */
export abstract class BaseModel<Data, Event extends EventMap = {}>
  implements Model<Data, Event>
{
  /**
   * Constructs a new instance of the BaseModel class.
   *
   * @param handlers - An object containing event handlers, where each key
   *                   corresponds to an event name and its value is the
   *                   associated handler function.
   */
  public constructor(private handlers: Event) {}

  /**
   * Invokes the handler for a specified event with the provided parameters.
   *
   * @param event - The name of the event to handle.
   * @param params - The parameters to pass to the event handler.
   * @returns The return value of the event handler.
   */
  public handle<E extends keyof Event>(
    event: E,
    ...params: Parameters<Event[E]>
  ): ReturnType<Event[E]> {
    return this.handlers[event](...params);
  }

  /**
   * An abstract method that must be implemented by subclasses to fetch
   * data of type `Data`. This method is intended to be asynchronous.
   *
   * @returns A promise that resolves to the data of type `Data`.
   */
  public abstract fetchData(): Promise<Data>;
}
