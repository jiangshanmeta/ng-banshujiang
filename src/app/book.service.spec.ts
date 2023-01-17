import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { BookService, Book, BookId, RecommendationItem } from './book.service'
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
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBooks )
        } )

    } )


    describe( '#getBook', ()=>{
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

        it( 'get the right book with id', ()=>{
            service.getBook( 1 as BookId ).subscribe( {
                next: book => expect( book )
                    .withContext( 'should return expected books' )
                    .toEqual( expectedBooks[0] ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBooks )
        } )

        it( 'handle not found book', ()=>{
            service.getBook( 100 as BookId ).subscribe( {
                next: book => expect( book )
                    .withContext( 'should return expected books' )
                    .toEqual( null ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/books.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBooks )
        } )

        

    } )

    describe( '#getBookCategories', ()=>{
        let expectedBookCategory: Record<string, BookId[]> = {}
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedBookCategory = {
                "ActionScript": [
                    1678,
                    1578,
                    1246,
                    1243,
                    1036,
                    598,
                    523,
                    519,
                    451
                ] as BookId[],
                "ASP.net": [
                    2530,
                    1879,
                    1863,
                    1858,
                    1838,
                    1837,
                    1769,
                    131,
                    79,
                    78
                ] as BookId[],
            }
        } )

        it( 'should return expected bookCategory', ()=>{
            service.getBookCategories().subscribe( {
                next: bookCategory  => expect( bookCategory )
                    .withContext( 'should return expected bookCategory' )
                    .toEqual( expectedBookCategory ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/bookCategory.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBookCategory )
        } )

    } )


    describe( '#getBookIdByCategory', ()=>{
        let expectedBookCategory: Record<string, BookId[]> = {}
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedBookCategory = {
                "ActionScript": [
                    1678,
                    1578,
                    1246,
                    1243,
                    1036,
                    598,
                    523,
                    519,
                    451
                ] as BookId[],
                "ASP.net": [
                    2530,
                    1879,
                    1863,
                    1858,
                    1838,
                    1837,
                    1769,
                    131,
                    79,
                    78
                ] as BookId[],
            }
        } )

        it( 'get bookIds with correct category', ()=>{
            service.getBookIdByCategory( 'ActionScript' ).subscribe( {
                next: category => expect( category )
                    .withContext( 'should return expected books' )
                    .toEqual( expectedBookCategory['ActionScript'] ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/bookCategory.json' )

            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBookCategory )
        } )

        it( 'handle not found category', ()=>{
            service.getBookIdByCategory( 'TypeScript' ).subscribe( {
                next: category => expect( category )
                    .withContext( 'handle not found category' )
                    .toEqual( [] ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/bookCategory.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedBookCategory )
        } )

        

    } )


    describe( '#getAllRecommendations', ()=>{
        let expectedRecommendation: RecommendationItem[] = []
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedRecommendation = [
                {
                    "id": 1 as BookId,
                    "recommendations": [
                        3152,
                        3149,
                        3100,
                        3095,
                        3085,
                        3078,
                        3073,
                        3072,
                        3069,
                        3027,
                        3023,
                        3020,
                        3012,
                        3005,
                        2939,
                        2897
                    ] as BookId[]
                },
                {
                    "id": 2 as BookId,
                    "recommendations": [
                        3152,
                        3149,
                        3100,
                        3095,
                        3085,
                        3078,
                        3073,
                        3072,
                        3069,
                        3027,
                        3023,
                        3020,
                        3012,
                        3005,
                        2939,
                        2897
                    ] as BookId[]
                },
            ]
        } )

        it( 'should return expected recommendation', ()=>{
            service.getAllRecommendations().subscribe( {
                next: recommendation  => expect( recommendation )
                    .withContext( 'should return expected recommendation' )
                    .toEqual( expectedRecommendation ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/recommendation.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedRecommendation )
        } )

    } )


    describe( '#getRecommendationByBookId', ()=>{
        let expectedRecommendation: RecommendationItem[] = []
        beforeEach( () => {

            service = TestBed.inject( BookService )
            expectedRecommendation = [
                {
                    "id": 1 as BookId,
                    "recommendations": [
                        3152,
                        3149,
                        3100,
                        3095,
                        3085,
                        3078,
                        3073,
                        3072,
                        3069,
                        3027,
                        3023,
                        3020,
                        3012,
                        3005,
                        2939,
                        2897
                    ] as BookId[]
                },
                {
                    "id": 2 as BookId,
                    "recommendations": [
                        3152,
                        3149,
                        3100,
                        3095,
                        3085,
                        3078,
                        3073,
                        3072,
                        3069,
                        3027,
                        3023,
                        3020,
                        3012,
                        3005,
                        2939,
                        2897
                    ] as BookId[]
                },
            ]
        } )

        it( 'get bookIds with correct bookId', ()=>{
            service.getRecommendationByBookId( 1 as BookId ).subscribe( {
                next: recommendation => expect( recommendation )
                    .withContext( 'get bookIds with correct bookId' )
                    .toEqual( expectedRecommendation[0].recommendations ),
                error: fail
            } )


            const req = httpTestingController
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/recommendation.json' )

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
                .expectOne( 'https://jiangshanmeta.github.io/spider-banshujiang/recommendation.json' )
            expect( req.request.method ).toEqual( 'GET' )

            req.flush( expectedRecommendation )
        } )

        

    } )


} )
