import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NgxPaginationModule } from 'ngx-pagination'

import { BookRoutingModule } from './book-routing.module'

import { BookListComponent } from './book-list/book-list.component'
import { BooksComponent } from './books/books.component'
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BookCategoryComponent } from './book-category/book-category.component'

import { ShareModule } from '../share/share.module'

@NgModule( {
    declarations: [
        BookListComponent,
        BooksComponent,
        BookDetailComponent,
        BookCategoryComponent,
    ],
    imports: [
        CommonModule,
        BookRoutingModule,
        NgxPaginationModule,
        ShareModule,
    ],

} )
export class BookModule { }
