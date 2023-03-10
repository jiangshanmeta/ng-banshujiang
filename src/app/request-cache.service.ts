/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core'
import { HttpRequest, HttpResponse } from '@angular/common/http'

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache {
  abstract get( req: HttpRequest<any> ): HttpResponse<any> | undefined;
  abstract put( req: HttpRequest<any>, response: HttpResponse<any> ): void;
}

const maxAge = 86400000 // maximum cache age (ms)

@Injectable()
export class RequestCacheService implements RequestCache {
    private cache = new Map<string, RequestCacheEntry>()

    get( req: HttpRequest<any> ): HttpResponse<any> | undefined {
        const url = req.urlWithParams
        const cached = this.cache.get( url )

        if ( !cached ) {
            return undefined
        }

        const isExpired = cached.lastRead < ( Date.now() - maxAge )

        return isExpired ? undefined : cached.response
    }

    put( req: HttpRequest<any>, response: HttpResponse<any> ): void {
        const url = req.urlWithParams

        const newEntry = { url, response, lastRead: Date.now() }
        this.cache.set( url, newEntry )

        // remove expired cache entries
        const expired = Date.now() - maxAge
        this.cache.forEach( entry => {
            if ( entry.lastRead < expired ) {
                this.cache.delete( entry.url )
            }
        } )

    }
}
