import { TestBed, inject} from '@angular/core/testing';

import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodoDataService = TestBed.get(TodoDataService);
    expect(service).toBeTruthy();
  });

  describe("#getAllTodos()", () => {
    const service: TodoDataService = TestBed.get(TodoDataService);

    it('should return an empty array by default', () => {
      expect(service.getAllTodos()).toEqual([]);
    })

    it("should return all todos", () => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1,todo2])
    })
  });

  describe("#save(todo)", () => {
    const service: TodoDataService = TestBed.get(TodoDataService);

    it("should automattically assign an incrementing id", () => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
  
      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    })

  });

  describe('#deleteTodoById()', () => {
    const service: TodoDataService = TestBed.get(TodoDataService);

    it("should remove todo with corresponding id", () => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
  
      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTodoById(2);
      expect(service.getAllTodos()).toEqual([]);

    });

    it("should not remove todo if id is not found", () => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
  
      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);

    });

  });

  describe("#updateTodoById()", inject([TodoDataService], (service: TodoDataService) => {

    it("should update todo with corresponding id and values", () => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(1, {title: 'new title'});
      expect(updatedTodo.title).toEqual("new title");
    });

    it("should return null if todo is not found", () => {
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(3, {title: 'new title'});
      expect(updatedTodo).toEqual(null);
    });

  }));

  describe("#toggleTodoById()", () => {
    const service: TodoDataService = TestBed.get(TodoDataService);

    it("should return updated todo with inverse complete status", () => {
      let todo = new Todo({title: 'hello', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(false);

    })
  })
});

