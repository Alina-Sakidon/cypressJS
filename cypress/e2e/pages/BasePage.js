
class BasePage {
  constructor() {
    this.url = 'https://guest:welcome2qauto@qauto.forstudy.space';
  }

  visit(path = '/') {
    cy.visit(Cypress.env('baseUrl') + path);
    return this;
  }
}

export default BasePage;