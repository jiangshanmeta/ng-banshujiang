import {  Pipe, PipeTransform } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router'
import {  delay, of, skip, } from 'rxjs'
import { Book, BookId, BookService } from 'src/app/book.service'
import { ActivatedRouteStub, RouterLinkDirectiveStub } from 'src/testing'

import { BookDetailComponent } from './book-detail.component'

@Pipe( {
    name: 'bookId2ImgUrl'
} )
export class BookId2ImgUrlPipeStub implements PipeTransform {
    transform( value: number ) {
        return `${value}.jpeg`
    }
}

describe( 'BookDetailComponent', () => {
    let component: BookDetailComponent
    let fixture: ComponentFixture<BookDetailComponent>
    let bookService: jasmine.SpyObj<BookService>

    let routeStub: ActivatedRouteStub

    beforeEach( async () => {
        routeStub =  new ActivatedRouteStub( {
            bookId: '1'
        } )

        await TestBed.configureTestingModule( {
            declarations: [
                RouterLinkDirectiveStub,
                BookId2ImgUrlPipeStub,
                BookDetailComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: routeStub
                },
                {
                    provide: BookService,
                    useValue: jasmine.createSpyObj( 'BookService', [
                        'getBook',
                        'getAllBooks',
                        'getRecommendationByBookId'
                    ] )
                }
            ]
        } ).compileComponents()

 

        fixture = TestBed.createComponent( BookDetailComponent )

        bookService = TestBed.inject( BookService ) as jasmine.SpyObj<BookService>
        bookService.getBook.and.returnValues(
            of( {
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
            } ),
            of( {
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
            }, )
        )

        bookService.getAllBooks.and.returnValue( of( [
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
        ] ) )

        bookService.getRecommendationByBookId.and.callFake( ( bookId )=>{
            if( bookId === 1 ){
                return of( [
                    2
                ] as BookId[] )
            }else if( bookId === 11 ){
                return of( [
                    1
                ] as BookId[] ).pipe( delay( 100 ) )
            }

            return of( [] )
        } )
        
        component = fixture.componentInstance
        fixture.detectChanges()
    } )

    it( 'should create', () => {
        expect( component ).toBeTruthy()
    } )

    it( 'should get bookInfo',()=>{
        expect( bookService.getBook.calls.count() ).toBe( 1 )
        expect( bookService.getBook.calls.first().args[0] ).toBe( 1 as BookId )
        expect( component.book ).toEqual( {
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
        } )

    } )


    it( 'should call service to get recommendation',()=>{
        expect( bookService.getAllBooks.calls.count() ).toBe( 1 )
        expect( bookService.getRecommendationByBookId.calls.count() ).toBe( 1 )
        expect( bookService.getRecommendationByBookId.calls.first().args[0] ).toBe( 1 as BookId )
    } )



    it( 'should get recommendation books',( done )=>{

        component.books$.subscribe( ( books )=>{
            expect( books ).toEqual( [
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
            done()
        } )

    } )


    it( 'should should recommendation books routerLink',()=>{
        const linkDes = fixture.debugElement.queryAll( By.directive( RouterLinkDirectiveStub ) )
        const routerLinks = linkDes.map( de => de.injector.get( RouterLinkDirectiveStub ) )

        expect( routerLinks.length ).toBe( 1 )
        expect( routerLinks[0].linkParams ).toBe( '/book/e_book/2' )

    } )

    it( 'should get new book when route change',()=>{
        routeStub.setParamMap( {
            bookId: '11',
        } )

        expect( bookService.getAllBooks.calls.count() ).toBe( 1 )
        expect( bookService.getBook.calls.mostRecent().args[0] ).toBe( 11 as BookId )
        expect( component.book ).toEqual( {
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
        } )

    } )


    it( 'should call service to get new recommendation when route change',()=>{
        routeStub.setParamMap( {
            bookId: '11'
        } )

        expect( bookService.getAllBooks.calls.count() ).toBe( 1 )
        expect( bookService.getRecommendationByBookId.calls.count() ).toBe( 2 )
        expect( bookService.getRecommendationByBookId.calls.mostRecent().args[0] ).toBe( 11 as BookId )
    } )

    it( 'should get new recommendation when route change',fakeAsync( ()=>{
        routeStub.setParamMap( {
            bookId: '11'
        } )

        let resultBooks: Book[] = []
        // be careful of the observable , every subscribe will make independent setup for observable
        component.books$.pipe( skip( 1 ) ).subscribe( ( books )=>{
            resultBooks = books
        } )

        tick( 100 )

        expect( resultBooks ).toEqual( [
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
            }
        ] )
    } ) )

} )
