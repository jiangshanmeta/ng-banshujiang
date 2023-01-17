import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { ActivatedRoute, Params } from '@angular/router'
import { of, } from 'rxjs'
import { Book, BookId, BookService } from 'src/app/book.service'
import { ActivatedRouteStub } from 'src/testing'

import { BookCategoryComponent } from './book-category.component'

describe( 'BookCategoryComponent', () => {

    const expectedBooks: Book[] = [
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
        {
            "id": 11 as BookId,
            "title": "Ruby编程语言",
            "img": "https://imagebsj.netlify.app/11.jpeg",
            "author": "David Flanagan,Yukihiro Matsumoto",
            "language": "中文",
            "publishYear": 2009,
            "programLanguage": "Ruby",
            "formats": [
                {
                    "fmt": "PDF",
                    "title": "城通网盘",
                    "link": "/e_books/11/webstorage_links/13539/to_link"
                }
            ]
        },

    ]


    async function arrange( {
        getAllBooks,
        getBookIdByCategory,
        routeParam
    }: {
        getAllBooks: ReturnType<BookService['getAllBooks']>,
        getBookIdByCategory: ReturnType<BookService['getBookIdByCategory']>,
        routeParam: Params
    } ){
        await TestBed.configureTestingModule( {
            declarations: [
                BookCategoryComponent
            ],
            providers: [
                {
                    provide: BookService,
                    useValue: jasmine.createSpyObj( 'BookService', [
                        'getAllBooks',
                        'getBookIdByCategory'
                    ] )
                },
                {
                    provide: ActivatedRoute,
                    useValue: new ActivatedRouteStub( routeParam )
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        } ).compileComponents()

        const bookService = TestBed.inject( BookService ) as jasmine.SpyObj<BookService>
        bookService.getAllBooks.and.returnValue( getAllBooks )
        bookService.getBookIdByCategory.and.returnValue( getBookIdByCategory )

        const route = TestBed.inject( ActivatedRoute )

        const fixture = TestBed.createComponent( BookCategoryComponent )
        const component = fixture.componentInstance

        return {
            bookService,
            route,
            component
        }
    }


    it( 'should create', async () => {
        const {
            component
        } = await arrange( {
            getAllBooks: of( expectedBooks ),
            getBookIdByCategory: of( [
                1
            ] as BookId[] ),
            routeParam: {
                categoryMainType: 'language',
                categorySubType: '中文'
            }
        } )

        expect( component ).toBeTruthy()
    } )


    it( 'should handle categoryMainType language categorySubType Chinese', async ()=>{
        const {
            component
        } = await arrange( {
            getAllBooks: of( expectedBooks ),
            getBookIdByCategory: of( [
                1
            ] as BookId[] ),
            routeParam: {
                categoryMainType: 'language',
                categorySubType: '中文'
            }
        } )

        component.ngOnInit()


        expect( component.books ).toEqual( [
            {
                "id": 11 as BookId,
                "title": "Ruby编程语言",
                "img": "https://imagebsj.netlify.app/11.jpeg",
                "author": "David Flanagan,Yukihiro Matsumoto",
                "language": "中文",
                "publishYear": 2009,
                "programLanguage": "Ruby",
                "formats": [
                    {
                        "fmt": "PDF",
                        "title": "城通网盘",
                        "link": "/e_books/11/webstorage_links/13539/to_link"
                    }
                ]
            },
        ] )

    } )

    it( 'should handle categoryMainType language categorySubType English', async ()=>{
        const {
            component,
            bookService
        } = await arrange( {
            getAllBooks: of( expectedBooks ),
            getBookIdByCategory: of( [
                1,
                2,
                11
            ] as BookId[] ),
            routeParam: {
                categoryMainType: 'language',
                categorySubType: '英文'
            }
        } )

        component.ngOnInit()


        expect( bookService.getAllBooks.calls.count() ).toBe( 1 )

        expect( component.books ).toEqual( [
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

        ] )
    } )

    

    it( 'should handle categoryMainType publish_year', async ()=>{
        const {
            component,
            bookService
        } = await arrange( {
            getAllBooks: of( expectedBooks ),
            getBookIdByCategory: of( [
                1,
                2,
                11
            ] as BookId[] ),
            routeParam: {
                categoryMainType: 'publish_year',
                categorySubType: '2010'
            }
        } )

        component.ngOnInit()

        expect( bookService.getAllBooks.calls.count() ).toBe( 1 )

        expect( component.books ).toEqual( [
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
        ] )

    } )


    it( 'should handle other categoryMainType', async ()=>{
        const {
            component,
            bookService
        } = await arrange( {
            getAllBooks: of( expectedBooks ),
            getBookIdByCategory: of( [
                1,
                2,
            ] as BookId[] ),
            routeParam: {
                categoryMainType: 'programming_language',
                categorySubType: 'JavaScript'
            }
        } )

        component.ngOnInit()
        expect( bookService.getAllBooks.calls.count() ).toBe( 1 )
        expect( bookService.getBookIdByCategory.calls.count() ).toBe( 1 )
        expect( bookService.getBookIdByCategory.calls.first().args[0] ).toBe( 'JavaScript' )
        expect( component.books ).toEqual( [
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
        ] )

    } )

} )
