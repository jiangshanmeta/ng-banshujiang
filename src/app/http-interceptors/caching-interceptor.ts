/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http'

import { Observable, of, tap } from 'rxjs'

import { RequestCache } from '../request-cache.service'

function sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache ): Observable<HttpEvent<any>> {
    return next.handle( req ).pipe(
        tap( event => {
            if ( event instanceof HttpResponse ) {
                cache.put( req, event )
            }
        } )
    )
}


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor( private cache: RequestCache ) {}

    intercept( req: HttpRequest<any>, next: HttpHandler ) {

        const cachedResponse = this.cache.get( req )
        return cachedResponse ?
            of( cachedResponse ) : sendRequest( req, next, this.cache )
    }
}