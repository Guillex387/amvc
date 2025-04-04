/**
 * ## Views in the Application
 *
 * Views are responsible for rendering data and handling user interactions
 * in the application. They act as the visual representation of the data
 * and provide mechanisms to respond to user events.
 *
 * ### Key Concepts
 * - **Rendering**: Views take data as input and produce an HTML element
 *   that represents the visual structure of the data.
 * - **Event Handling**: Views allow registering callback functions for
 *   specific events, enabling interaction with the rendered elements.
 * - **Type-Safe Abstractions**: Views leverage TypeScript's type system
 *   to ensure that data and event handling are type-safe, reducing runtime errors
 *   and improving developer productivity.
 */

import type { EventMap } from './event-map';

/**
 * Represents a view in the application that is responsible for rendering data
 * and handling events.
 *
 * @template Data - The type of data that the view will render.
 * @template Event - A map of event names to their corresponding callback types.
 */
export interface View<Data, Event extends EventMap> {
  /**
   * Registers a callback function to handle a specific event.
   *
   * @param event - The name of the event to listen for.
   * @param callback - The callback function to execute when the event is triggered.
   */
  onEvent<E extends keyof Event>(event: E, callback: Event[E]): void;

  /**
   * Renders the view using the provided data and returns the resulting HTML element.
   *
   * @param data - The data to be used for rendering the view.
   * @returns The root HTML element of the rendered view.
   */
  render(data: Data): HTMLElement;
}

/**
 * An abstract base class for creating views in an application.
 * This class provides a mechanism for handling events and rendering data.
 *
 * @template Data - The type of data that the view will render.
 * @template Event - A mapping of event names to their corresponding handler types.
 *                   Defaults to an empty event map.
 */
export abstract class BaseView<Data, Event extends EventMap = {}>
  implements View<Data, Event>
{
  /**
   * A collection of event handlers mapped by event names.
   * Handlers are stored as partial mappings of the `Event` type.
   */
  private eventHandlers: Partial<Event> = {};

  /**
   * Retrieves the handler for a specific event.
   * If no handler is registered for the event, an empty function is returned.
   *
   * @param event - The name of the event to retrieve the handler for.
   * @returns The event handler function, or an empty function if no handler is registered.
   */
  protected getHandler<E extends keyof Event>(event: E): Event[E] {
    const emptyFunction = (() => {}) as Event[E];
    return this.eventHandlers[event] ?? emptyFunction;
  }

  /**
   * Registers a callback function for a specific event.
   *
   * @param event - The name of the event to register the callback for.
   * @param callback - The callback function to handle the event.
   */
  public onEvent<E extends keyof Event>(event: E, callback: Event[E]): void {
    this.eventHandlers[event] = callback;
  }

  /**
   * Abstract method to render the view using the provided data.
   * This method must be implemented by subclasses.
   *
   * @param data - The data to be rendered by the view.
   * @returns An HTML element representing the rendered view.
   */
  public abstract render(data: Data): HTMLElement;
}
