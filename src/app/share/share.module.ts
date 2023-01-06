import { NgModule } from '@angular/core'
import { BookId2ImgUrlPipe } from './book-id2-img-url.pipe'

@NgModule({
    declarations: [
        BookId2ImgUrlPipe
    ],
    exports: [
        BookId2ImgUrlPipe
    ]
})
export class ShareModule { }
