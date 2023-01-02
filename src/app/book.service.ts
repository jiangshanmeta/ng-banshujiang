import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs'

export interface Book {
    id: number
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

@Injectable({
    providedIn: 'root'
})
export class BookService {
    constructor(private http: HttpClient) {}

    getAllBooks() {
        return this.http.get<Book[]>('https://jiangshanmeta.github.io/spider-banshujiang/books.json')
    }

    getBook(bookId: number) {
        return this.getAllBooks().pipe(map((books) => books.find((book) => book.id === bookId) || null))
    }

    getBookCategories() {
        return this.http.get<Record<string, number[]>>('https://jiangshanmeta.github.io/spider-banshujiang/bookCategory.json')
    }

    getBookIdByCategory(category: string) {
        return this.getBookCategories().pipe(map((res) => res[category] || []))
    }
}
