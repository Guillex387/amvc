/**
 * ## Controller Interface and BaseController Abstract Class
 *
 * This module defines the `Controller` interface and the `BaseController` abstract class,
 * which are used to create and manage controllers in an application. Controllers are responsible
 * for handling the logic and behavior of specific parts of the application, often interacting
 * with the DOM or other components.
 *
 * ### Key Concepts
 * - **Logic Management**: Controllers encapsulate the logic for specific parts of the application.
 * - **View Updates**: Controllers interact with views to update the user interface.
 * - **Event Coordination**: Controllers coordinate events between models and views.
 */

/**
 * Represents a generic controller interface that defines the structure for
 * managing updates and executing logic.
 */
export interface Controller {
  /**
   * Registers a callback function to handle updates to the controller's rendered element.
   *
   * @param callback - A function that receives an `HTMLElement` to be rendered or updated.
   */
  onUpdate(callback: (element: HTMLElement) => void): void;

  /**
   * Executes the main logic of the controller. This method should be implemented
   * by concrete classes to define the behavior of the controller.
   */
  run(): void;
}

/**
 * An abstract base class that provides a foundation for creating controllers.
 * It implements the `Controller` interface and provides a default implementation
 * for the `onUpdate` method.
 */
export abstract class BaseController implements Controller {
  /**
   * A function used to render or update the controller's element. This function
   * is set via the `onUpdate` method.
   */
  protected render: (element: HTMLElement) => void = () => {};

  /**
   * Registers a callback function to handle updates to the controller's rendered element.
   *
   * @param callback - A function that receives an `HTMLElement` to be rendered or updated.
   */
  public onUpdate(callback: (element: HTMLElement) => void): void {
    this.render = callback;
  }

  /**
   * Executes the main logic of the controller. This method must be implemented
   * by subclasses to define the specific behavior of the controller.
   */
  public abstract run(): void;
}
