import BasePage from './BasePage.js';

class MainPage extends BasePage {
    constructor() {
        super(); 
        this.signUpButton = '.btn-primary';
    }

    visit() {
        cy.visit(this.url); 
        return this;
      }

    clickSignUpButton() {
        cy.get(this.signUpButton).click();
    }
}

export default MainPage;