import { BaseModel } from '@/core';
import type { ToDoItem } from '@/lib/todo-item';

export type ToDoListModelEvents = {
  add: (name: string) => void;
  remove: (id: number) => void;
  clear: () => void;
};

export class ToDoListModel extends BaseModel<ToDoItem[], ToDoListModelEvents> {
  private lastId: number = 0;
  private todos: ToDoItem[] = [];

  private add(name: string) {
    this.todos.push({
      id: this.lastId++,
      name,
      description: 'Default',
      completed: false,
    });
  }

  private remove(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  private clear() {
    this.todos = [];
  }

  public constructor() {
    super({
      add: (name) => this.add(name),
      remove: (id) => this.remove(id),
      clear: () => this.clear(),
    });
  }

  public async fetchData(): Promise<ToDoItem[]> {
    return this.todos;
  }
}
