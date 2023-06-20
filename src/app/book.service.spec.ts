import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { BookService, Book, BookId } from './book.service'
import { API_URL } from './app.config'

describe( 'BookService', () => {
    let service: BookService

    let httpTestingController: HttpTestingController
    beforeEach( () => {

        TestBed.configureTestingModule( {
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: API_URL,
                    useValue: 'https://jiangshanmeta.github.io/spider-banshujiang/'
                },
            ]
        } )
      
        httpTestingController = TestBed.inject( HttpTestingController )
        service = TestBed.inject( BookService )
    } )


    afterEach( () => {
        httpTestingController.verify()
    } )

    it( 'should be created', () => {
        expect( service ).toBeTruthy()
    } )


    describe( '#getAllBooks', ()=>{
        let expectedBooks: Book[] = []
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedBooks = [
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
        } )

        it( 'should return expected books', ()=>{
            service.getAllBooks().subscribe( {
                next: books => expect( books )
                    .withContext( 'should return expected books' )
                    .toEqual( expectedBooks ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBooks )
        } )

    } )


    describe( '#getBook', ()=>{
        let expectedBook: Book | null
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedBook = {
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
            }
        } )

        it( 'get the right book with id', ()=>{
            service.getBook( 1 as BookId ).subscribe( {
                next: book => expect( book )
                    .withContext( 'should return expected books' )
                    .toEqual( expectedBook ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books/1.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBook )
        } )

        it( 'handle not found book', ()=>{
            service.getBook( 100 as BookId ).subscribe( {
                next: book => expect( book )
                    .withContext( 'should return expected books' )
                    .toEqual( null ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books/100.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( null )
        } )

        

    } )



    describe( '#getBooksByCategory', ()=>{
        let expectedBookCategory: Record<string, Book[]> = {}
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedBookCategory = {
                "ActionScript": [
                    {
                        "id": 1678 as BookId,
                        "title": "Learning ActionScript 3.0",
                        "img": "https://imagebsj.netlify.app/1678.jpeg",
                        "author": "Rich Shupe with Zevan Rosser",
                        "language": "英文",
                        "publishYear": 2007,
                        "programLanguage": "ActionScript",
                        "formats": [
                            {
                                "fmt": "PDF",
                                "title": "城通网盘",
                                "link": "/e_books/1678/webstorage_links/12062/to_link"
                            }
                        ]
                    },
                    {
                        "id": 1578 as BookId,
                        "title": "Getting Started with Flex 3",
                        "img": "https://imagebsj.netlify.app/1578.jpeg",
                        "author": "Jack Herrington and Emily Kim",
                        "language": "英文",
                        "publishYear": 2008,
                        "programLanguage": "ActionScript",
                        "formats": [
                            {
                                "fmt": "PDF",
                                "title": "城通网盘",
                                "link": "/e_books/1578/webstorage_links/12472/to_link"
                            }
                        ]
                    },
                ],
                "ASP.net": [
                    {
                        "id": 2530 as BookId,
                        "title": "ASP.NET Core in Action 2nd Edition",
                        "img": "https://imagebsj.netlify.app/2530.jpeg",
                        "author": "Andrew Lock",
                        "language": "英文",
                        "publishYear": 2021,
                        "programLanguage": "ASP.net",
                        "formats": [
                            {
                                "fmt": "PDF",
                                "title": "城通网盘",
                                "link": "/e_books/2530/webstorage_links/8764/to_link"
                            }
                        ]
                    },
                    {
                        "id": 1879 as BookId,
                        "title": "Programming Visual Basic 2008",
                        "img": "https://imagebsj.netlify.app/1879.jpeg",
                        "author": "Tim Patrick",
                        "language": "英文",
                        "publishYear": 2008,
                        "programLanguage": "ASP.net",
                        "formats": [
                            {
                                "fmt": "PDF",
                                "title": "城通网盘",
                                "link": "/e_books/1879/webstorage_links/11862/to_link"
                            }
                        ]
                    },
                ],
            }
        } )

        it( 'get books with correct category', ()=>{
            service.getBooksByCategory( 'ActionScript' ).subscribe( {
                next: category => expect( category )
                    .withContext( 'should return expected books' )
                    .toEqual( expectedBookCategory['ActionScript'] ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/categories/ActionScript.json' )

            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBookCategory['ActionScript'] )
        } )

        it( 'handle not found category', ()=>{
            service.getBooksByCategory( 'TypeScript' ).subscribe( {
                next: category => expect( category )
                    .withContext( 'handle not found category' )
                    .toEqual( [] ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/categories/TypeScript.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( [] )
        } )

        

    } )


    describe( '#getRecommendationByBookId', ()=>{
        let expectedRecommendation: Book[] = []
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedRecommendation = [
                {
                    "id": 3420 as BookId,
                    "title": "React: Up &amp; Running",
                    "img": "http://image.banshujiang.cn/3420.jpeg?timestamp=1681546006679",
                    "author": "Stoyan Stefanov",
                    "language": "英文",
                    "publishYear": 2016,
                    "programLanguage": "JavaScript",
                    "formats": [
                        {
                            "fmt": "PDF",
                            "title": "城通网盘",
                            "link": "/e_books/3420/webstorage_links/17855/to_link"
                        }
                    ]
                },
                {
                    "id": 3409 as BookId,
                    "title": "Node.js for Embedded Systems",
                    "img": "http://image.banshujiang.cn/3409.jpeg?timestamp=1681542798788",
                    "author": "Patrick Mulder and Kelsey Breseman",
                    "language": "英文",
                    "publishYear": 2016,
                    "programLanguage": "JavaScript",
                    "formats": [
                        {
                            "fmt": "PDF",
                            "title": "城通网盘",
                            "link": "/e_books/3409/webstorage_links/17817/to_link"
                        },
                        {
                            "fmt": "EPUB",
                            "title": "城通网盘",
                            "link": "/e_books/3409/webstorage_links/17815/to_link"
                        },
                        {
                            "fmt": "MOBI",
                            "title": "城通网盘",
                            "link": "/e_books/3409/webstorage_links/17816/to_link"
                        }
                    ]
                },
            ]
        } )

        it( 'get books with correct bookId', ()=>{
            service.getRecommendationByBookId( 1 as BookId ).subscribe( {
                next: recommendation => expect( recommendation )
                    .withContext( 'get books with correct bookId' )
                    .toEqual( expectedRecommendation ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books/1/recommendation.json' )

            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedRecommendation )
        } )

        it( 'handle not found bookId', ()=>{
            service.getRecommendationByBookId( 1000 as BookId ).subscribe( {
                next: recommendation => expect( recommendation )
                    .withContext( 'handle not found category' )
                    .toEqual( [] ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books/1000/recommendation.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( [] )
        } )

        

    } )


} )
