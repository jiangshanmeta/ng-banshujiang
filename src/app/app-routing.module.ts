import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { BookListComponent } from './book-list/book-list.component'

import { HomeComponent } from './home/home.component'

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
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
