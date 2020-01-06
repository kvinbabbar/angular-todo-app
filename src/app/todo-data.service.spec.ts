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
    
    it('should return an empty array by default', () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      expect(service.getAllTodos()).toEqual([]);
    })
    
    it("should return all todos", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1,todo2])
    })
  });

  describe("#save(todo)", () => {
    
    it("should automattically assign an incrementing id", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
  
      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    })

  });

  describe('#deleteTodoById()', () => {
    
    it("should remove todo with corresponding id", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
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
      const service: TodoDataService = TestBed.get(TodoDataService);
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      let todo2 = new Todo({title: 'Hello 2', complete: true});
  
      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTodoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);

    });

  });

  describe("#updateTodoById()", () => {

    it("should update todo with corresponding id and values", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(1, {title: 'new title'});
      expect(updatedTodo.title).toEqual("new title");
    });
    
    it("should return null if todo is not found", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      let todo1 = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo1);
      let updatedTodo = service.updateTodoById(3, {title: 'new title'});
      expect(updatedTodo).toEqual(null);
    });

  });

  describe("#toggleTodoById()", () => {
    
    it("should return updated todo with inverse complete status", () => {
      const service: TodoDataService = TestBed.get(TodoDataService);
      let todo = new Todo({title: 'hello', complete: false});
      service.addTodo(todo);
      let updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(false);

    })
  })
});

