import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { NgxPaginationModule } from 'ngx-pagination'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { BooksComponent } from './books/books.component'
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BookCategoryComponent } from './book-category/book-category.component'
import { BookListComponent } from './book-list/book-list.component'
import { BookId2ImgUrlPipe } from './book-id2-img-url.pipe'

@NgModule({
    declarations: [AppComponent, HomeComponent, BooksComponent, BookDetailComponent, BookCategoryComponent, BookListComponent, BookId2ImgUrlPipe],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgxPaginationModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
