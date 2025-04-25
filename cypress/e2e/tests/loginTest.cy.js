import MainPage from '../pages/MainPage';
import RegistrationPage from '../pages/RegistrationPage';
import ProfilePage from '../pages/ProfilePage';
import User from '../../support/User';

describe('Login Test', () => {
    const mainPage = new MainPage();
    const registration = new RegistrationPage();
    const profilePage = new ProfilePage();
    const newUser = User.generateRandomUser();

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
  
  profilePage.openUserDropdown().logout();
  cy.login(user);

  mainPage.openUserDropdown().goToProfile();
  profilePage.getProfileName().should('contain', `${user.firstName} ${user.lastName}`);
});
});