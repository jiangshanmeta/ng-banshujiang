describe( 'Test book detail page', ()=>{
    beforeEach( ()=>{

        cy.intercept( 'GET', '*/books/2971.json', {
            fixture: 'book2971.json'
        } )

        cy.intercept( 'GET', '*/books/2971/recommendation.json', {
            fixture: 'recommendation2971.json'
        } )

        cy.intercept( 'GET', '*/books/2393.json', {
            fixture: 'book2393.json'
        } )

        cy.intercept( 'GET', '*/books/2393/recommendation.json', {
            fixture: 'recommendation2393.json'
        } )

    } )

    it( 'Visit detail page', ()=>{
        cy.visit( '/#/book/e_book/2971' )

        cy.contains( 'Learning TypeScript' )
        cy.contains( '相关推荐' )
    } )

    it( 'Visit recommendation book works', ()=>{
        cy.visit( '/#/book/e_book/2971' )

        cy.contains( 'Effective TypeScript' ).click()
        cy.url().should( 'include', '/book/e_book/2393' )

    } )

} )