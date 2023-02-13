/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpRequest, HttpResponse } from '@angular/common/http'
import { fakeAsync, TestBed, tick } from '@angular/core/testing'

import { RequestCacheService } from './request-cache.service'

describe( 'RequestCacheService', () => {
    let service: RequestCacheService

    beforeEach( () => {
        TestBed.configureTestingModule( {
            providers: [
                RequestCacheService
            ]
        } )
        service = TestBed.inject( RequestCacheService )
    } )

    it( 'should be created ', () => {
        expect( service ).toBeTruthy()
    } )


    describe( 'get method should work correctly', ()=>{

        it( 'should return undefined without cache', ()=>{
            const result = service.get(
                {
                    url: 'https://jiangshanmeta.github.io/spider?id=sakura'
                } as HttpRequest<any>
            )

            expect( result ).toBe( undefined )
        } )


        it( 'should return undefined when cache is expired', fakeAsync( ()=>{
            const url = 'https://jiangshanmeta.github.io/spider?id=sakura'
            const req = {
                url
            } as HttpRequest<any>

            const res = {
                body: 'cache data'
            } as HttpResponse<any>

            service.put(
                req,
                res
            )

            tick( 86400000 )
            expect( service.get( req ) ).toEqual( res )
            tick( 1 )

            expect( service.get( req ) ).toBe( undefined )

        } ) )



    } )


    describe( 'put method should work correctly', ()=>{

        it( 'should put data into cache', ()=>{
            const url = 'https://jiangshanmeta.github.io/spider?id=sakura'
            const req = {
                url
            } as HttpRequest<any>

            const res = {
                body: 'cache data'
            } as HttpResponse<any>

            service.put(
                req,
                res
            )

            expect( service.get( req ) ).toEqual( res )
        } )


    } )

} )
