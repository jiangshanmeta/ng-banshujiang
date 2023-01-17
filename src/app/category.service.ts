import { Inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from './app.config'

export interface CategoryItem {
    label: string
    tags: {
        label: string
        url: string
    }[]
}

@Injectable( {
    providedIn: 'root'
} )
export class CategoryService {
    constructor( private http: HttpClient, @Inject( API_URL ) private api_url: string ) {}

    getCategories() {
        return this.http.get<CategoryItem[]>( `${this.api_url}categories.json` )
    }
}
