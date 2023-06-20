import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Book, BookService } from '../../book.service'



@Component( {
    selector: 'app-book-category',
    templateUrl: './book-category.component.html',
    styleUrls: [
        './book-category.component.css'
    ]
} )
export class BookCategoryComponent implements OnInit {
    books: Book[] = []
    constructor( private bookService: BookService, private route: ActivatedRoute ) {}

    ngOnInit(): void {
        const categoryMainType = this.route.snapshot.paramMap.get( 'categoryMainType' )
        const categorySubType = decodeURIComponent( this.route.snapshot.paramMap.get( 'categorySubType' ) || '' )

        if ( !categorySubType ) {
            return
        }

        if ( categoryMainType === 'language' ) {
            this.bookService.getAllBooks().subscribe( ( books ) => {
                this.books = books.filter( ( book ) => book.language === categorySubType ).reverse()
            } )
            return
        }

        if ( categoryMainType === 'publish_year' ) {
            this.bookService.getAllBooks().subscribe( ( books ) => {
                this.books = books.filter( ( book ) => book.publishYear === +categorySubType ).reverse()
            } )
            return
        }

        this.bookService.getBooksByCategory( categorySubType ).subscribe( ( books )=>{
            this.books = books
        } )


    }
}
