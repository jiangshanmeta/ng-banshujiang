import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { NgxPaginationModule } from 'ngx-pagination'

import { BookRoutingModule } from './book-routing.module'

import { BookListComponent } from './book-list/book-list.component'
import { BooksComponent } from './books/books.component'
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BookCategoryComponent } from './book-category/book-category.component'

import { BookId2ImgUrlPipe } from './book-id2-img-url.pipe'

@NgModule({
    declarations: [
        BookListComponent,
        BooksComponent,
        BookDetailComponent, 
        BookCategoryComponent, 
        
        BookId2ImgUrlPipe
    ],
    imports: [
        CommonModule,
        BookRoutingModule,
        NgxPaginationModule
    ],
    exports: [
        BookId2ImgUrlPipe
    ]
})
export class BookModule { }
