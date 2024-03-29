import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { map, Observable, of, switchMap, tap } from 'rxjs'
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
            map( ( paramMap )=> Number( paramMap.get( 'bookId' ) ) as BookId )
        )

        bookId$.pipe(
            tap( ()=>this.loading = true ),
            switchMap( ( bookId )=>this.bookService.getBook( bookId ) )
        ).subscribe( ( book )=>{
            this.book = book
            this.loading = false
        } )
        
        this.books$ = bookId$.pipe(
            switchMap( ( bookId )=> this.bookService.getRecommendationByBookId( bookId ) )
        )
        


    }
}
