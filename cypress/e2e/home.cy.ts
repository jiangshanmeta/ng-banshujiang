describe( 'In home page', () => {
    beforeEach( ()=>{
        cy.intercept( 'GET', '*/categories', {
            fixture: 'categories.json'
        } )

        cy.intercept( 'GET', '*/books', {
            fixture: 'books.json'
        } )

    } )


    it( 'Visits the initial project page', () => {
        cy.visit( '/' )
        cy.contains( '分类' )
        cy.contains( '最新更新' )
    } )


    it( 'Click the TypeScript tag and route to  /book/category/programming_language/TypeScript ', ()=>{
        cy.visit( '/' )
        cy.contains( 'TypeScript' ).click()
        cy.url().should( 'include', '/book/category/programming_language/TypeScript' )
    } )


    it( 'Click 所有书籍 and route to /book/books', ()=>{
        cy.visit( '/' )
        cy.contains( '所有书籍' ).click()

        cy.url().should( 'include', '/book/books' )
    } )


    it( 'Click 更多 and route to /book/books', ()=>{
        cy.visit( '/' )
        cy.contains( '更多' ).click()

        cy.url().should( 'include', '/book/books' )
    } )

    it( 'Should visit book detail page when click the book', ()=>{
        cy.visit( '/' )
        cy.contains( 'Data Visualization with Python and JavaScript 2nd Edition' ).click()

        cy.url().should( 'include', '/book/e_book/3320' )
    } )

} )
