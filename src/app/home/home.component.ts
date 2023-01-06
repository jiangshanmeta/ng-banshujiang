import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { Book, BookService } from '../book.service'
import { CategoryItem, CategoryService } from '../category.service'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [
        './home.component.css'
    ]
})
export class HomeComponent implements OnInit {
    categories$: Observable<CategoryItem[]> = of([])
    books: Book[] = []

    constructor(private categoryService: CategoryService, private bookService: BookService, private router: Router) {}

    ngOnInit(): void {
        this.categories$ = this.categoryService.getCategories()

        this.bookService.getAllBooks().subscribe((books) => {
            this.books = books.slice(-16).reverse()
        })
    }

    gotoBookList() {
        this.router.navigateByUrl('/book/books')
    }
}
