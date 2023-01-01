import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { BookListComponent } from './book-list/book-list.component'
import { BookDetailComponent } from './book-detail/book-detail.component'

@NgModule({
    declarations: [AppComponent, HomeComponent, BookListComponent, BookDetailComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
