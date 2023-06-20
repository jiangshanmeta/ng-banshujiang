import { Injectable, Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs'
import { API_URL } from './app.config'

export type BookId = number & {
    readonly __nominal: unique symbol;
}

export interface Book {
    id: BookId
    title: string
    img: string
    author: string
    language: string
    publishYear: number
    programLanguage: string;
    formats: {
        fmt: string
        title: string
        link: string
    }[]
}

// export interface RecommendationItem {
//     id: BookId;
//     recommendations: Book[];
// }



@Injectable( {
    providedIn: 'root'
} )
export class BookService {
    constructor( private http: HttpClient, @Inject( API_URL ) private api_url: string ) {

    }

    getAllBooks() {
        return this.http.get<Book[]>( `${this.api_url}books` )
    }

    getBook( bookId: BookId ) {
        return this.http.get<Book | null>( `${this.api_url}books/${bookId}.json` )
            .pipe( map( ( book )=>book || null ) )
    }

    getBooksByCategory( category: string ) {
        return this.http.get<Book[]>( `${this.api_url}categories/${category}.json` )
    }

    getRecommendationByBookId( bookId: BookId ){
        return this.http.get<Book[]>( `${this.api_url}books/${bookId}/recommendation.json` )
    }


}
