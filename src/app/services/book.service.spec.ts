import { TestBed } from '@angular/core/testing';

import { bookService } from './book.service';

describe('bookService', () => {
  let service: bookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(bookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
