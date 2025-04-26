
class BasePage {
  constructor() {
    this.url = 'https://guest:welcome2qauto@qauto.forstudy.space';
  }

  visit() {
    cy.visit(this.url);
    return this;
  }
}

export default BasePage;