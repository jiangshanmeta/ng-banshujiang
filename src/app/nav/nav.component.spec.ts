import { DebugElement } from '@angular/core'
import { ComponentFixture, TestBed, } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterLinkDirectiveStub, setSpyonObjProperty } from 'src/testing'
import { ThemeService } from '../theme.service'

import { NavComponent } from './nav.component'


describe('NavComponent', () => {
    let component: NavComponent
    let fixture: ComponentFixture<NavComponent>
    let themeServiceSpy: jasmine.SpyObj<ThemeService>

    let nativeElement: HTMLElement

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                NavComponent,
                RouterLinkDirectiveStub
            ],
            providers:[
                {
                    provide: ThemeService,
                    useValue: jasmine.createSpyObj('ThemeService', [
                        'toggle'
                    ],[
                        'theme'
                    ])
                }
            ]
        })
            .compileComponents()

        fixture = TestBed.createComponent(NavComponent)

        component = fixture.componentInstance

        nativeElement = fixture.nativeElement
        fixture.detectChanges()

        themeServiceSpy = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })


    describe('should handle routerLink',()=>{
        let routerLinks: RouterLinkDirectiveStub[]
        let linkDes: DebugElement[]
        beforeEach(()=>{
            linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))
            routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub))
        })

        it('can get RouterLinks from template',()=>{
            expect(routerLinks.length).toBe(2)
            expect(routerLinks[0].linkParams).toBe('/')
            expect(routerLinks[1].linkParams).toBe('/book/books')
        })


    })


    describe('should handle theme',()=>{
        it('should show light icon when theme is light',()=>{

            setSpyonObjProperty(themeServiceSpy,'theme','light')
    
            fixture.detectChanges()
    
            expect(nativeElement.querySelector("#nav-theme-light")).not.toBe(null)
            expect(nativeElement.querySelector('#nav-theme-dark')).toBe(null)
        })
    
        it('should show dark icon when theme is dark',()=>{
    
            setSpyonObjProperty(themeServiceSpy,'theme','dark')
    
            fixture.detectChanges()
    
            expect(nativeElement.querySelector("#nav-theme-light")).toBe(null)
            expect(nativeElement.querySelector('#nav-theme-dark')).not.toBe(null)
        })
    
    
        it('should call themeService toggle method when click',()=>{
    
            const container = nativeElement.querySelector('#nav-theme-container') as HTMLElement
            container.click()
    
            expect(themeServiceSpy.toggle.calls.count()).toBe(1)
        })
    })






})
