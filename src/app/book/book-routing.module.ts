import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BookCategoryComponent } from './book-category/book-category.component'
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BooksComponent } from './books/books.component'

const routes: Routes = [
    {
        path: 'e_book/:bookId',
        component: BookDetailComponent
    },
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'category/:categoryMainType/:categorySubType',
        component: BookCategoryComponent
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class BookRoutingModule { }
