import { Injectable } from '@angular/core'

export type Theme = 'light' | 'dark'

const themeLocalStorageKey = 'theme'

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private _theme: Theme  = 'light'

    get theme(){
        return this._theme
    }

    constructor() {
        const localTheme = localStorage.getItem(themeLocalStorageKey) || 'light'
        this._theme = localTheme as Theme
        this.setHTMLTheme()
    }

    private setHTMLTheme(){
        if(this._theme === 'light'){
            document.documentElement.classList.remove('dark')
        }else{
            document.documentElement.classList.add('dark')
        }
    }

    toggle(){
        if(this._theme === 'dark'){
            this._theme = 'light'
            localStorage.setItem(themeLocalStorageKey,'light')
        }else{
            this._theme = 'dark'
            localStorage.setItem(themeLocalStorageKey,'dark')
        }
        this.setHTMLTheme()
    }
}
