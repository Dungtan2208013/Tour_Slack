import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/common/Books';
import { BookDetails } from 'src/app/common/BookDetails';
import { booksService } from 'src/app/services/books.service';


@Component({

  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  booksDetails!: BookDetails[];
  book!: Books;

  @Input() id!: number;

  constructor(private modalService: NgbModal, private booksService: booksService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getBooks();
    this.getBooksDetails();
    this.getItems();
  }

  getBooks() {
    this.booksService.getById(this.id).subscribe(
      data => {
        this.book = data as Books;
      },
      error => {
        this.toastr.error('Lỗi server', 'Hệ thống');
      }
    );
  }
  getItems() {
    this.booksService.getByBooks(this.id).subscribe(data => {
      this.booksDetails = data as BookDetails[];
    }, error => {
      this.toastr.error('Lỗi server', 'Hệ thống');
    })
  }
  getBooksDetails() {
    this.booksService.getByBooks(this.id).subscribe(
      data => {
        this.booksDetails = data as BookDetails[];
      },
      error => {
        this.toastr.error('Lỗi server', 'Hệ thống');
      }
    );
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' })
  }

  finish() {
    this.ngOnInit();
  }

}
