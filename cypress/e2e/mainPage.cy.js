describe('Test main page tests', () => {
    it('Main page should have correct URL', () => {
      cy.visit('/')
      cy.url().should('eq', 'https://prozorro.gov.ua/en/')
    })
  
    it('Main page should have header burger element', () => {
      cy.visit('/')
      cy.get('.header__burger').should('exist')
    })
  })