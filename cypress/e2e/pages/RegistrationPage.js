import BasePage from './BasePage.js';
import 'cypress-xpath';

class RegistrationPage extends BasePage {

  constructor() {
    super();
    this.firstNameField = '#signupName';
    this.lastNameField = '#signupLastName';
    this.emailField = '#signupEmail';
    this.passwordField = '#signupPassword';
    this.reEnterPasswordField = '#signupRepeatPassword';
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
    cy.get(this.passwordField).clear().type(password);
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

  validateFieldError(field, isValid = false, errorMessages = []) {
    const borderColor = isValid ? 'rgb(206, 212, 218)' : 'rgb(220, 53, 69)';
    const classAssertion = isValid ? 'not.have.class' : 'have.class';
  
    cy.get(field)
      .should(classAssertion, 'is-invalid')
      .and('have.css', 'border-color', borderColor);
  
    // Проверяем ошибки только если они переданы
    (Array.isArray(errorMessages) ? errorMessages : [errorMessages])
      .filter(Boolean) // удалит null/undefined/пустые
      .forEach(errorMessage => {
        cy.contains(errorMessage).should(isValid ? 'not.be.visible' : 'be.visible');
      });
  
    return this;
  }

  clickFieldAndBlur(field) {
    cy.get(field)
      .click()
      .blur();
    return this;
  }
}

export default RegistrationPage;