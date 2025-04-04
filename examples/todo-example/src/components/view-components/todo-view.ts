import { BaseView } from '@/core';
import { ToDoItem } from '@/lib/todo-item';

export type ToDoViewEvents = {
  remove: (id: number) => void;
};

export class ToDoView extends BaseView<ToDoItem, ToDoViewEvents> {
  public render(data: ToDoItem): HTMLElement {
    const title = document.createElement('h3');
    title.textContent = data.name;

    const description = document.createElement('p');
    description.textContent = data.description;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';

    removeButton.addEventListener('click', () =>
      this.getHandler('remove')(data.id)
    );

    const container = document.createElement('div');
    container.append(title, description, removeButton);
    return container;
  }
}
