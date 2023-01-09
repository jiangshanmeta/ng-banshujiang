import { ThemeService } from './theme.service'

describe('ThemeService', () => {

    it('handle localstorage value null', () => {
        spyOn(localStorage, "getItem").and.returnValue(null)
        const classListRemoveSpy = spyOn(document.documentElement.classList,'remove')
        const service = new ThemeService()

        expect(service.theme).toBe('light')
        expect(localStorage.getItem).toHaveBeenCalledTimes(1)
        expect(classListRemoveSpy.calls.count()).toBe(1)
        expect(classListRemoveSpy.calls.mostRecent().args['0']).toBe('dark')
    })


    it('handle localstorage value light', () => {
        spyOn(localStorage, "getItem").and.returnValue('light')
        const classListRemoveSpy = spyOn(document.documentElement.classList,'remove')
        const service = new ThemeService()

        expect(service.theme).toBe('light')
        expect(localStorage.getItem).toHaveBeenCalledTimes(1)
        expect(classListRemoveSpy.calls.count()).toBe(1)
        expect(classListRemoveSpy.calls.mostRecent().args['0']).toBe('dark')
    })

    it('handle localstorage value dark', () => {
        spyOn(localStorage, "getItem").and.returnValue('dark')
        const classListAddSpy = spyOn(document.documentElement.classList,'add')
        const service = new ThemeService()

        expect(service.theme).toBe('dark')
        expect(localStorage.getItem).toHaveBeenCalledTimes(1)
        expect(classListAddSpy.calls.count()).toBe(1)
        expect(classListAddSpy.calls.mostRecent().args['0']).toBe('dark')
    })


    it('handle toggle when theme is light', () => {
        spyOn(localStorage, "getItem").and.returnValue('light')
        const localStorageSetItemSpy = spyOn(localStorage,"setItem")
        const classListAddSpy = spyOn(document.documentElement.classList,'add')
        const service = new ThemeService()
        service.toggle()

        expect(service.theme).toBe('dark')
        expect(localStorageSetItemSpy.calls.count()).toBe(1)
        expect(localStorageSetItemSpy.calls.mostRecent().args).toEqual([
            'theme',
            'dark'
        ])

        expect(classListAddSpy.calls.count()).toBe(1)
        expect(classListAddSpy.calls.mostRecent().args['0']).toBe('dark')
    })

    it('handle toggle when theme is dark', () => {
        spyOn(localStorage, "getItem").and.returnValue('dark')
        const localStorageSetItemSpy = spyOn(localStorage,"setItem")
        const classListRemoveSpy = spyOn(document.documentElement.classList,'remove')
        const service = new ThemeService()
        service.toggle()

        expect(service.theme).toBe('light')
        expect(localStorageSetItemSpy.calls.count()).toBe(1)
        expect(localStorageSetItemSpy.calls.mostRecent().args).toEqual([
            'theme',
            'light'
        ])

        expect(classListRemoveSpy.calls.count()).toBe(1)
        expect(classListRemoveSpy.calls.mostRecent().args['0']).toBe('dark')
    })




})
