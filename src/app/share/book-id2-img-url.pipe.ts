import { Inject, Pipe, PipeTransform } from '@angular/core'
import { API_URL } from '../app.config'

@Pipe({
    name: 'bookId2ImgUrl'
})
export class BookId2ImgUrlPipe implements PipeTransform {
    constructor(@Inject(API_URL) private api_url: string){

    }

    transform(value: number) {
        return `${this.api_url}images/${value}.jpeg`
    }
}
