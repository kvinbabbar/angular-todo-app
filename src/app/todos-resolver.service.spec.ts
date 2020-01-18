import { TestBed } from '@angular/core/testing';

import { TodosResolverService } from './todos-resolver.service';

describe('TodosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosResolverService = TestBed.get(TodosResolverService);
    expect(service).toBeTruthy();
  });
});
