
import 'cypress-xpath';
Cypress.Commands.add('login', (user) => {
    cy.visit('https://qauto.forstudy.space/');
    cy.get('button.header_signin').click();
    cy.get('#signinEmail').type(user.email);
    cy.get('#signinPassword').type(user.password);
    cy.contains('button', 'Login').click();
});