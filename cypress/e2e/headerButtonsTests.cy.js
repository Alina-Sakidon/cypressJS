describe('Header buttons functionality tests', () => {
  const baseUrl = 'https://guest:welcome2qauto@qauto.forstudy.space/';
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Should display Home button and navigate correctly', () => {
    cy.get('.header-link').contains('Home').should('be.visible').click();
    cy.url().should('include', 'https://qauto.forstudy.space/');
  });

  it('About button should navigate to About section', () => {
    cy.get('.header-link').contains('About').should('be.visible').click();
    cy.get('#aboutSection').should('be.visible');
  });

  it('Contacts button should navigate to Contacts section', () => {
    cy.get('.header-link').contains('Contacts').should('be.visible').click();
    cy.get('#contactsSection').should('be.visible');
  });

  it('Should display auth buttons: Sign In, Guest log in', () => {
    const expectedAuthButtons = ['Sign In', 'Guest log in'];
    cy.get('.header_right').within(() => {
      expectedAuthButtons.forEach((btnText) => {
        cy.contains('button', btnText).should('be.visible');
      });
    });
  });

  it('Clicking Sign In should open sign in modal', () => {
    cy.get('.header_right').contains('Sign In').click();
    cy.get('.modal-content').should('be.visible');
  });

  it('Clicking Guest log in should perform guest login', () => {
    cy.get('.header_right').contains('Guest log in').click();
    cy.url().should('include', 'https://qauto.forstudy.space/panel/garage');
    cy.get('span.icon-logout').should('be.visible');
  });

  it('Sign up button should navigate to registration', () => {
    cy.get('button').contains('Sign up').should('be.visible').click();
    cy.get('app-signup-modal').should('be.visible');
  });
});
