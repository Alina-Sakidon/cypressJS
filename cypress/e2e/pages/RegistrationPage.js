import BasePage from './BasePage.js';
import 'cypress-xpath';

class RegistrationPage extends BasePage {

  constructor() {
    super();
    this.firstNameField = '#signupName';
    this.lastNameField = '#signupLastName';
    this.emailField = '#signupEmail';
    this.passwordField = '#signupPassword';
    this.reEnterPasswordField = '#signupRePassword';
    this.signUpSubmitButton = '//button[contains(text(), "Register")]';
  }

  fillFirstName(firstName) {
    cy.get(this.firstNameField).type(firstName);
    return this;
  };

  fillLastName(lastName) {
    cy.get(this.lastNameField).type(lastName);
    return this;
  };

  fillEmail(email) {
    cy.get(this.emailField).type(email);
    return this;
  };

  fillPassword(password) {
    cy.get(this.passwordField).type(password);
    return this;
  };

  fillReEnterPassword(reEnterPassword) {
    cy.get(this.reEnterPasswordField).type(reEnterPassword);
    return this;
  };

  clickSignUpSubmitButton() {
    cy.xpath(this.signUpSubmitButton).click();
    return this;
  }

  fillForm(firstName, lastName, email, password, reEnterPassword) {
    return this
      .fillFirstName(firstName)
      .fillLastName(lastName)
      .fillEmail(email)
      .fillPassword(password)
      .fillReEnterPassword(reEnterPassword);
  }

  validateFieldError(field, errorMessage) {
    cy.get(field)
      .should('have.class', 'is-invalid')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
    cy.contains(errorMessage).should('be.visible');
  }

  clickFieldAndBlur(field) {
    cy.get(field)
      .click()
      .blur();
    return this;
  }
}

export default RegistrationPage;