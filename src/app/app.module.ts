import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { BookModule } from './book/book.module'
import { AppRoutingModule } from './app-routing.module'
import { ShareModule } from './share/share.module'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'

import { API_URL } from './app.config'
import { NavComponent } from './nav/nav.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent, 
        NavComponent
    ],
    imports: [
        BrowserModule,
        BookModule,
        AppRoutingModule,
        HttpClientModule,
        ShareModule,
    ],
    providers: [
        {
            provide:API_URL,
            useValue:'https://jiangshanmeta.github.io/spider-banshujiang/'
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
