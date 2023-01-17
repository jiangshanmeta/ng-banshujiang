import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Observable, of, switchMap,combineLatest } from 'rxjs'
import { Book, BookId, BookService } from '../../book.service'

@Component( {
    selector: 'app-book-detail',
    templateUrl: './book-detail.component.html',
    styleUrls: [
        './book-detail.component.css'
    ]
} )
export class BookDetailComponent implements OnInit {
    loading = true
    book: Book | null = null
    books$: Observable<Book[]> = of( [] )
    constructor( private route: ActivatedRoute, private bookService: BookService ) {}

    ngOnInit(): void {
        const bookId$ = this.route.paramMap.pipe(
            map( ( paramMap )=>  Number( paramMap.get( 'bookId' ) ) as BookId )
        )

        bookId$.subscribe( ( bookId )=>{
            this.loading = true
            this.bookService.getBook( bookId ).subscribe( ( book ) => {
                this.book = book
                this.loading = false
            } )
        } )


        this.books$ = combineLatest( {
            books: this.bookService.getAllBooks(),
            bookIds: bookId$.pipe(
                switchMap( ( bookId )=> this.bookService.getRecommendationByBookId( bookId ) )
            )
        } ).pipe(
            map( ( { books, bookIds } )=>{
                const bookMap = books.reduce<Record<BookId, Book>>( ( acc, item ) => {
                    acc[item.id] = item
                    return acc
                }, {} )
                return bookIds.map( ( bookId ) => bookMap[bookId] ).filter( ( item ) => item )
            } )
        )

    }
}
