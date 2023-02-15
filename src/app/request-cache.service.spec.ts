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
                    urlWithParams: 'https://jiangshanmeta.github.io/spider?id=sakura'
                } as HttpRequest<any>
            )

            expect( result ).toBe( undefined )
        } )


        it( 'should return undefined when cache is expired', fakeAsync( ()=>{
            const urlWithParams = 'https://jiangshanmeta.github.io/spider?id=sakura'
            const req = {
                urlWithParams
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
            const urlWithParams = 'https://jiangshanmeta.github.io/spider?id=sakura'
            const req = {
                urlWithParams
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


        it( 'should delete expired data when put', fakeAsync( ()=>{
            const spyOnDelete = spyOn( Map.prototype, 'delete' )
            const url1 = 'https://jiangshanmeta.github.io/spider?id=1'
 
            service.put(
                {
                    urlWithParams: url1
                } as HttpRequest<any>,
                {
                    body: 'cache data1'
                } as HttpResponse<any>
            )

            tick( 10000 )

            const url2 = 'https://jiangshanmeta.github.io/spider?id=2'

            service.put(
                {
                    urlWithParams: url2
                } as HttpRequest<any>,
                {
                    body: 'cache data2'
                } as HttpResponse<any>
            )

            expect( spyOnDelete.calls.count() ).toBe( 0 )

            // make the first cache expire
            tick( 86400000-10000+1 )

            const url3 = 'https://jiangshanmeta.github.io/spider?id=3'

            service.put(
                {
                    urlWithParams: url3
                } as HttpRequest<any>,
                {
                    body: 'cache data3'
                } as HttpResponse<any>
            )

            expect( Map.prototype.delete ).toHaveBeenCalledTimes( 1 )

            expect( spyOnDelete.calls.allArgs() ).toEqual( [
                [
                    'https://jiangshanmeta.github.io/spider?id=1'
                ],
            ] )

            
        } ) )

    } )

} )
