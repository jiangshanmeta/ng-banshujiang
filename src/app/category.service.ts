import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

export interface CategoryItem {
    label: string
    tags: {
        label: string
        url: string
    }[]
}

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    getCategories() {
        return this.http.get<CategoryItem[]>('https://jiangshanmeta.github.io/spider-banshujiang/categories.json')
    }
}
