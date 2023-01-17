import { Component, OnInit } from '@angular/core'
import { Book, BookService } from '../../book.service'

@Component( {
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: [
        './books.component.css'
    ]
} )
export class BooksComponent implements OnInit {
    books: Book[] = []
    constructor( private bookService: BookService ) {}

    ngOnInit(): void {
        this.bookService.getAllBooks().subscribe( ( books ) => ( this.books = [
            ...books
        ].reverse() ) )
    }
}
