import { BookId2ImgUrlPipe } from './book-id2-img-url.pipe'

describe('BookId2ImgUrlPipe', () => {
    it('create an instance', () => {
        const pipe = new BookId2ImgUrlPipe('')
        expect(pipe).toBeTruthy()
    })


    it('BookId2ImgUrlPipe transform', () => {
        const pipe = new BookId2ImgUrlPipe('https://jiangshanmeta.github.io/spider-banshujiang/')
        expect(pipe.transform(1)).toBe('https://jiangshanmeta.github.io/spider-banshujiang/images/1.jpeg')
    })
})
