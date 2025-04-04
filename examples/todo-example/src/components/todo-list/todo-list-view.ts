import { BaseView, View } from '@/core';
import { ToDoItem } from '@/lib/todo-item';

export type ToDoListViewEvents = {
  add: (name: string) => void;
  remove: (id: number) => void;
};

type TodoItemViewLike = View<ToDoItem, { remove: (id: number) => void }>;

export class ToDoListView extends BaseView<ToDoItem[], ToDoListViewEvents> {
  public constructor(private toDoItemView: TodoItemViewLike) {
    super();
  }

  public render(data: ToDoItem[]): HTMLElement {
    // Add input field
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter a new task';

    // Add submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Add';

    // Create form
    const form = document.createElement('form');
    form.append(input, submitButton);

    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.getHandler('add')(input.value);
    });

    // Render todo items
    const list = document.createElement('ul');
    data.forEach((item) => {
      const itemView = this.toDoItemView.render(item);
      list.appendChild(itemView);
    });

    this.toDoItemView.onEvent('remove', (id) => this.getHandler('remove')(id));

    const container = document.createElement('div');
    container.append(form, list);

    return container;
  }
}
