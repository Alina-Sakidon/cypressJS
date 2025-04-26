import BasePage from "./BasePage";
import 'cypress-xpath';

class LoginPage extends BasePage {
    constructor() {
        super();
        this.emailField = '#signinEmail';
        this.passwordField = '#signinPassword';
        this.loginButton = '//button[text()="Login"]';
    }

    enterEmail(email) {
        cy.get(this.emailField).type(email);
        return this;
    }

    enterPassword(password) {
        cy.get(this.passwordField).type(password, { sensitive: true });
        return this;
    }

    submit() {
        cy.xpath(this.loginButton).click();
        return this;
    }
}

export default LoginPage;
