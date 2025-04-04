import { BaseController, View, Model } from '@/core';
import type { ToDoItem } from '@/lib/todo-item';
import type { ToDoListViewEvents } from './todo-list-view';
import type { ToDoListModelEvents } from './todo-list-model';

type ToDoListModelLike = Model<ToDoItem[], ToDoListModelEvents>;

type ToDoListViewLike = View<ToDoItem[], ToDoListViewEvents>;

export class ToDoListController extends BaseController {
  private handleAdd(name: string) {
    this.model.handle('add', name);
    this.model.fetchData().then((data) => this.render(this.view.render(data)));
  }

  private handleRemove(id: number) {
    this.model.handle('remove', id);
    this.model.fetchData().then((data) => this.render(this.view.render(data)));
  }

  public constructor(
    private model: ToDoListModelLike,
    private view: ToDoListViewLike
  ) {
    super();
    this.view.onEvent('add', this.handleAdd.bind(this));
    this.view.onEvent('remove', this.handleRemove.bind(this));
  }

  public run(): void {
    // Default render
    this.render(this.view.render([]));
  }
}
