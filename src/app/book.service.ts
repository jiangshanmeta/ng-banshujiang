import { Injectable,Inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs'
import { API_URL } from './app.config';

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
    formats: {
        fmt: string
        title: string
        link: string
    }[]
}

export interface RecommendationItem {
    id:BookId;
    recommendations:BookId[];
}



@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(private http: HttpClient, @Inject(API_URL) private api_url:string ) {

    }

    getAllBooks() {
        return this.http.get<Book[]>(`${this.api_url}books.json`)
    }

    getBook(bookId: BookId) {
        return this.getAllBooks().pipe(map((books) => books.find((book) => book.id === bookId) || null))
    }

    getBookCategories() {
        return this.http.get<Record<string, BookId[]>>(`${this.api_url}bookCategory.json`)
    }

    getBookIdByCategory(category: string) {
        return this.getBookCategories().pipe(map((res) => res[category] || []))
    }


    getAllRecommendations(){
        return this.http.get<RecommendationItem[]>(`${this.api_url}recommendation.json`)
    }

    getRecommendationByBookId(bookId: BookId){
        return this.getAllRecommendations().pipe(map(res=>res.find(item=>item.id === bookId)?.recommendations || [] ))
    }


}
