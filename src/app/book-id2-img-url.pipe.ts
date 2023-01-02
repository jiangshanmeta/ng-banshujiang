import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'bookId2ImgUrl'
})
export class BookId2ImgUrlPipe implements PipeTransform {
    transform(value: number) {
        return `https://jiangshanmeta.github.io/spider-banshujiang/images/${value}.jpeg`
    }
}
