import { Pipe, PipeTransform } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { RouterLinkDirectiveStub } from 'src/testing'
import { Book, BookId, BookService } from '../book.service'
import { CategoryItem, CategoryService } from '../category.service'

import { HomeComponent } from './home.component'


@Pipe({
    name: 'bookId2ImgUrl'
})
export class BookId2ImgUrlPipeStub implements PipeTransform {
    transform(value: number) {
        return `${value}.jpeg`
    }
}


describe('HomeComponent', () => {
    let component: HomeComponent
    let fixture: ComponentFixture<HomeComponent>
    let categoryService: jasmine.SpyObj<CategoryService>
    let bookService: jasmine.SpyObj<BookService>
    let router: jasmine.SpyObj<Router>


    const expectedCategory: CategoryItem[] = [
        {
            "label": "编程语言",
            "tags": [
                {
                    "label": "ActionScript",
                    "url": "/category/programming_language/ActionScript"
                },
                {
                    "label": "ASP.net",
                    "url": "/category/programming_language/ASP.net"
                },
            ]
        },
        {
            "label": "移动开发",
            "tags": [
                {
                    "label": "Android",
                    "url": "/category/mobile_development/Android"
                },
                {
                    "label": "iOS",
                    "url": "/category/mobile_development/iOS"
                }
            ]
        },
    ]

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
    ]


    beforeEach(async () => {

        await TestBed.configureTestingModule({
            declarations: [
                BookId2ImgUrlPipeStub,
                RouterLinkDirectiveStub,
                HomeComponent
            ],
            providers: [
                {
                    provide: CategoryService,
                    useValue: jasmine.createSpyObj('CategoryService', [
                        'getCategories'
                    ])
                },
                {
                    provide: BookService,
                    useValue: jasmine.createSpyObj('BookService', [
                        'getAllBooks'
                    ])
                },
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj('Router', [
                        'navigateByUrl'
                    ])
                }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(HomeComponent)

        categoryService = TestBed.inject(CategoryService) as jasmine.SpyObj<CategoryService>
        categoryService.getCategories.and.returnValue(of(expectedCategory))

        bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>
        bookService.getAllBooks.and.returnValue(of(expectedBooks))

        router = TestBed.inject(Router) as jasmine.SpyObj<Router>

        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })


    describe('test HomeComponent Class',()=>{

        it('test gotoBookList method',()=>{
            component.gotoBookList()
            expect(router.navigateByUrl.calls.first().args[0]).toBe('/book/books')
        })

        it('should call getCategories method from categoryService',()=>{
            expect(categoryService.getCategories.calls.count()).toBe(1)
        })

        it('should call getAllBooks method from bookService',()=>{
            expect(bookService.getAllBooks.calls.count()).toBe(1)
        })

        it('should get categories from service',(done)=>{
            component.categories$.subscribe((categories)=>{
                expect(categories).toEqual(expectedCategory)
                done()
            })
        })

        it('test component handle books from bookService',(done)=>{
            component.books$.subscribe({
                next: (books)=>{

                    expect(books).toEqual([
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
    
                    ])

                    done()
                },
                error: done.fail
            })



            

        })


    })




    describe('should handle template',()=>{
        it('should tell Router to navigate when home-more clicked',()=>{
            const homeMoreDom = fixture.nativeElement.querySelector("#home-more") as HTMLElement
            homeMoreDom.click()
    
            expect(router.navigateByUrl.calls.first().args[0]).toBe('/book/books')
        })




    })


})
