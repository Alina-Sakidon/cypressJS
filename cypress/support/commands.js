
import 'cypress-xpath';
Cypress.Commands.add('login', (user) => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');
    cy.get('button.header_signin').click();
    cy.get('#signinEmail').type(user.email);
    cy.get('#signinPassword').type(user.password);
    cy.contains('button', 'Login').click();
});

Cypress.Commands.add('loginFromEnv', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('button.header_signin').click();
    cy.get('#username').type(Cypress.env('username'));
    cy.get('#password').type(Cypress.env('password'));
    cy.get('#login-button').click();
  });

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      options.log = false;
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      });
    }
    return originalFn(element, text, options);
  });