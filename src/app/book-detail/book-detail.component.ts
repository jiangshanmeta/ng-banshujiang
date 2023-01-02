import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Book, BookService } from '../book.service'

@Component({
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: [
        './book-detail.component.css'
    ]
})
export class BookDetailComponent implements OnInit {
    loading = true
    book: Book | null = null
    constructor(private route: ActivatedRoute, private bookService: BookService) {}

    ngOnInit(): void {
        this.loading = true
        const bookId = Number(this.route.snapshot.paramMap.get('bookId'))

        this.bookService.getBook(bookId).subscribe((book) => {
            this.book = book
            this.loading = false
        })
    }
}
