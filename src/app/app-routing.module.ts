import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BookCategoryComponent } from './book-category/book-category.component'
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BooksComponent } from './books/books.component'

import { HomeComponent } from './home/home.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
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
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes,{ useHash:true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
