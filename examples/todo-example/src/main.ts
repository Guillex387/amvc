import { ToDoListController } from '@/components/todo-list/todo-list-controller';
import { ToDoListModel } from '@/components/todo-list/todo-list-model';
import { ToDoListView } from '@/components/todo-list/todo-list-view';
import { ToDoView } from '@/components/view-components/todo-view';

function main() {
  const model = new ToDoListModel();
  const todoView = new ToDoView();
  const view = new ToDoListView(todoView);
  const app = new ToDoListController(model, view);
  app.onUpdate((domElement) => {
    document.body.replaceChildren();
    document.body.appendChild(domElement);
  });
  app.run();
}

main();
