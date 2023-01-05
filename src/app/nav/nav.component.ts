import { Component } from '@angular/core'
import { ThemeService } from '../theme.service'

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: [
        './nav.component.css'
    ]
})
export class NavComponent {
    constructor(public themeService:ThemeService){

    }
}
