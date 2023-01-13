import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { Book, BookId, BookService } from 'src/app/book.service'
import { ActivatedRouteStub } from 'src/testing'

import { BookCategoryComponent } from './book-category.component'

describe('BookCategoryComponent', () => {
    let component: BookCategoryComponent
    let fixture: ComponentFixture<BookCategoryComponent>

    let bookService: jasmine.SpyObj<BookService>

    const expectedBooks:Book[] = [
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



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BookCategoryComponent
            ],
            providers: [
                {
                    provide: BookService,
                    useValue: jasmine.createSpyObj('BookService', [
                        'getAllBooks',
                    ])
                },
                {
                    provide: ActivatedRoute,
                    useValue: new ActivatedRouteStub({
                        categoryMainType: 'language',
                        categorySubType: 'TypeScript'
                    })
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        }).compileComponents()

        bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>
        bookService.getAllBooks.and.returnValue(of(expectedBooks))

        fixture = TestBed.createComponent(BookCategoryComponent)
        component = fixture.componentInstance
        // fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
