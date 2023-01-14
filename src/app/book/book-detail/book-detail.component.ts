import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { forkJoin } from 'rxjs'
import { Book, BookId, BookService } from '../../book.service'

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
    books: Book[] = []
    constructor(private route: ActivatedRoute, private bookService: BookService) {}

    ngOnInit(): void {

        this.route.paramMap.subscribe((paramMap)=>{
            this.loading = true
            const bookId = Number(paramMap.get('bookId')) as BookId
            this.bookService.getBook(bookId).subscribe((book) => {
                this.book = book
                this.loading = false
            })


            forkJoin({
                books: this.bookService.getAllBooks(),
                bookIds: this.bookService.getRecommendationByBookId(bookId)
            }).subscribe(({ books, bookIds }) => {
                const bookMap = books.reduce<Record<BookId, Book>>((acc, item) => {
                    acc[item.id] = item
                    return acc
                }, {})
    
                this.books = bookIds.map((bookId) => bookMap[bookId]).filter((item) => item)
            })
        })
        

    }
}
