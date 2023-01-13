import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { BookService } from 'src/app/book.service'
import { ActivatedRouteStub } from 'src/testing'

import { BookDetailComponent } from './book-detail.component'

describe('BookDetailComponent', () => {
    let component: BookDetailComponent
    let fixture: ComponentFixture<BookDetailComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                BookDetailComponent
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: new ActivatedRouteStub({
                        bookId: '1'
                    })
                },
                {
                    provide: BookService,
                    useValue: jasmine.createSpyObj('BookService', [
                        'getAllBooks'
                    ])
                }
            ]
        }).compileComponents()

        fixture = TestBed.createComponent(BookDetailComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
