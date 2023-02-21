describe( 'Test book detail page', ()=>{
    beforeEach( ()=>{

        cy.intercept( 'GET', '*/recommendation.json', {
            fixture: 'recommendation.json'
        } )

        cy.intercept( 'GET', '*/books.json', {
            fixture: 'books.json'
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