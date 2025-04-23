describe('Test main page tests', () => {
  const baseUrl = 'https://prozorro.gov.ua/en/'
    it('Main page should have correct URL', () => {
      cy.visit(baseUrl)
      cy.url().should('eq', baseUrl)
    })
  
    it('Main page should have header burger element', () => {
      cy.visit(baseUrl)
      cy.get('.header__burger').should('exist')
    })
  })