import { HttpClient } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { asyncData } from 'src/testing'
import { API_URL } from './app.config'

import { CategoryItem, CategoryService } from './category.service'

describe('CategoryService', () => {
    let service: CategoryService
    let httpClientSpy: jasmine.SpyObj<HttpClient>

    beforeEach(() => {
        const spy = jasmine.createSpyObj('HttpClient', [
            'get'
        ])
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: HttpClient,
                    useValue: spy
                },
                {
                    provide: API_URL,
                    useValue: 'https://jiangshanmeta.github.io/spider-banshujiang/'
                }
            ]
        })
        service = TestBed.inject(CategoryService)
        httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })


    it('getCategories should work', (done) => {
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
        httpClientSpy.get.and.returnValue(asyncData(expectedCategory))

        service.getCategories().subscribe({
            next: (categories)=>{
                expect(categories)
                    .withContext('expected categories')
                    .toEqual(expectedCategory)

                expect(httpClientSpy.get.calls.count()).toBe(1)
                expect(httpClientSpy.get.calls.mostRecent().args[0])
                    .toBe('https://jiangshanmeta.github.io/spider-banshujiang/categories.json')


                done()
            },
            error: done.fail
        })


        
    })


})
