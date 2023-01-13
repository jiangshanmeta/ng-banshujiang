import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { BookId } from 'src/app/book.service'
import { RouterLinkDirectiveStub } from 'src/testing'



import { BookListComponent } from './book-list.component'

@Pipe({
    name: 'paginate'
})
export class PaginatePipeStub implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    transform<T>(value:T,args:any) {
        return value
    }
}


@Pipe({
    name: 'bookId2ImgUrl'
})
export class BookId2ImgUrlPipeStub implements PipeTransform {
    transform(value: number) {
        return `${value}.jpeg`
    }
}



describe('BookListComponent', () => {
    let component: BookListComponent
    let fixture: ComponentFixture<BookListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                PaginatePipeStub,
                BookId2ImgUrlPipeStub,
                RouterLinkDirectiveStub,
                BookListComponent
            ],
            schemas: [
                // ignore pagination-controls
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(BookListComponent)
        component = fixture.componentInstance
        component.books = [
            {
                "id": 1 as BookId,
                "title": "JavaScript Cookbook",
                "img": "https://imagebsj.netlify.app/1.jpeg",
                "author": "Shelly Powers",
                "language": "英文",
                "publishYear": 2010,
                "programLanguage": "JavaScript",
                "formats": [
                    {
                        "fmt": "PDF",
                        "title": "城通网盘",
                        "link": "/e_books/1/webstorage_links/13519/to_link"
                    }
                ]
            },
            {
                "id": 2 as BookId,
                "title": "JavaScript Patterns",
                "img": "https://imagebsj.netlify.app/2.jpeg",
                "author": "Stoyan Stefanov",
                "language": "英文",
                "publishYear": 2010,
                "programLanguage": "JavaScript",
                "formats": [
                    {
                        "fmt": "PDF",
                        "title": "城通网盘",
                        "link": "/e_books/2/webstorage_links/13521/to_link"
                    }
                ]
            },
        ]


        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should handle routerLink',()=>{
        const linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))
        const routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub))

        expect(routerLinks.length).toBe(2)
        expect(routerLinks[0].linkParams).toBe('/book/e_book/1')
        expect(routerLinks[1].linkParams).toBe('/book/e_book/2')
    })


})
