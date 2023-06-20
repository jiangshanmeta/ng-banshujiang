describe( 'Test book category list page', ()=>{

    beforeEach( ()=>{
        cy.intercept( 'GET', '*/books', {
            fixture: 'books.json'
        } )


        cy.intercept( 'GET', '*/categories/Android.json', {
            fixture: 'Android.json'
        } )

    } )


    it( 'Visit android category', ()=>{
        cy.visit( '/#/book/category/mobile_development/Android' )

        cy.contains( 'Reactive Programming with Kotlin' )
    } )


    it( 'Pagination should work', ()=>{
        cy.visit( '/#/book/category/mobile_development/Android' )

        cy.get( '.ngx-pagination' ).contains( '2' ).click()

        cy.contains( 'Reactive Programming with Kotlin' ).should( 'not.exist' )

    } )


    it( 'should route to detail page when click book title', ()=>{
        cy.visit( '/#/book/category/mobile_development/Android' )
        cy.contains( 'Head First Android Development 2nd Edition' ).click()

        cy.url().should( 'include', '/book/e_book/3187' )
    } )



} )