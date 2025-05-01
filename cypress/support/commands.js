
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
  cy.get('#signinEmail').type(Cypress.env('username'));
  cy.get('#signinPassword').type(Cypress.env('password'));
  cy.contains('button', 'Login').click();
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

Cypress.Commands.add('loginAndVisitUI', (path) => {
  cy.request({
    method: 'POST',
    url: 'https://qauto.forstudy.space/api/auth/signin',
    body: {
      email: 'alinaS@gmail.com',
      password: 'Qwerty123',
      remember: true
    },
    withCredentials: true
  }).then((resp) => {
    const cookie = resp.headers['set-cookie']?.find(c => c.startsWith('sid'));
    if (cookie) {
      const sidValue = cookie.split(';')[0].split('=')[1];
      cy.log(`Extracted cookie: ${sidValue}`);

      cy.setCookie('sid', sidValue, {
        domain: 'qauto.forstudy.space',
      });

      cy.visit(`https://guest:welcome2qauto@qauto.forstudy.space${path}`, {
        failOnStatusCode: false
      });
      cy.url().should('include', path);
    } else {
      throw new Error('SID cookie not found in response headers');
    }
  });
});
