import MainPage from '../e2e/pages/MainPage';
import RegistrationPage from '../e2e/pages/RegistrationPage';


describe('Registration Form Validation', () => {
    const mainPage = new MainPage();
  const registration = new RegistrationPage();

  beforeEach(() => {
    mainPage.visit().clickSignUpButton();
  });

  it('Should show error if first name is empty or invalid', () => {
    registration.clickFieldAndBlur(registration.firstNameField)
    .validateFieldError(registration.firstNameField, 'Name required');
  });
});

