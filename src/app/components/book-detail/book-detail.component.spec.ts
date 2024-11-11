import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent  } from './book-detail.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailComponent ;
  let fixture: ComponentFixture<BookDetailComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailComponent  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
