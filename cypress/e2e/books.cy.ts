describe( 'Test book list page', ()=>{

    beforeEach( ()=>{
        cy.intercept( 'GET', '*/books', {
            fixture: 'books.json'
        } )

        cy.intercept( 'GET', '*/books/3320.json', {
            fixture: 'book3320.json'
        } )


    } )


    it( 'Visit android category', ()=>{
        cy.visit( '/#/book/books' )

        cy.contains( 'Data Visualization with Python and JavaScript 2nd Edition' )

        
    } )

    it( 'should have 10 book in one page', ()=>{
        cy.visit( '/#/book/books' )

        cy.get( '[data-testcls="book-list-item"]' ).should( 'have.length', 10 )
    } )


    it( 'Pagination should work', ()=>{
        cy.visit( '/#/book/books' )

        // 这里pagination组件生成的html比较复杂 取一个不重复的
        cy.get( '.ngx-pagination' ).contains( '5' ).click()

        cy.contains( 'Data Visualization with Python and JavaScript 2nd Edition' ).should( 'not.exist' )

    } )


    it( 'should route to detail page when click book title', ()=>{
        cy.visit( '/#/book/books' )
        cy.contains( 'Data Visualization with Python and JavaScript 2nd Edition' ).click()

        cy.url().should( 'include', '/book/e_book/3320' )
    } )

} )