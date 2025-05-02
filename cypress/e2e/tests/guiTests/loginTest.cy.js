import MainPage from '../../pages/MainPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ProfilePage from '../../pages/ProfilePage';
import User from '../../../support/User';
import LoginPage from '../../pages/LoginPage';

describe('Login Test', () => {
    const mainPage = new MainPage();
    const registration = new RegistrationPage();
    const profilePage = new ProfilePage();
    const newUser = User.generateRandomUser();
    const loginPage = new LoginPage();

    before(() => {
        Cypress.env('testUser', newUser);

        mainPage.visit();
        mainPage.clickSignUpButton();
        registration.fillForm(newUser).clickSignUpSubmitButton();
        mainPage.openUserDropdown().goToProfile();
        profilePage.getProfileName().should('contain', `${newUser.firstName} ${newUser.lastName}`);
    });

    it('Should login with valid credentials', () => {
        const user = Cypress.env('testUser');
        mainPage.openUserDropdown().logout();

        cy.login(user);

        mainPage.openUserDropdown().goToProfile();
        profilePage.getProfileName().should('contain', `${user.firstName} ${user.lastName}`);
    });

    it('Should log in with hidden password in logs', () => {
        const user = Cypress.env('testUser');
        mainPage.visit().clickSignInButton();

        loginPage.enterEmail(user.email).enterPassword(user.password).submit();
    });
})