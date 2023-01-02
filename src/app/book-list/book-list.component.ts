import { Component, OnInit } from '@angular/core'
import { Book, BookService } from '../book.service'

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[] = []
    currentPage = 1
    constructor(private bookService: BookService) {}

    ngOnInit(): void {
        this.bookService.getAllBooks().subscribe((books) => (this.books = [...books].reverse()))
    }
}
