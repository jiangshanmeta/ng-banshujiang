import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BookDetailComponent } from './book-detail/book-detail.component'
import { BookListComponent } from './book-list/book-list.component'

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
        path: 'bookList',
        component: BookListComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
