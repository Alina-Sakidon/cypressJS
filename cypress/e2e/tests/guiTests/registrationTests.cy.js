import MainPage from '../../pages/MainPage';
import RegistrationPage from '../../pages/RegistrationPage';
import User from '../../../support/User';
import ProfilePage from '../../pages/ProfilePage';


describe('Registration Form Validation', () => {
    const mainPage = new MainPage();
    const registration = new RegistrationPage();
    const profilePage = new ProfilePage();

    beforeEach(() => {
        mainPage.visit().clickSignUpButton();
    });

    it('Should register new user', () => {
        const user = User.generateRandomUser();

        registration.fillForm(user).clickSignUpSubmitButton();
        mainPage.openUserDropdown().goToProfile();

        profilePage.getProfileName().should('contain', `${user.firstName} ${user.lastName}`);
    })

    it('Should show error if first name is empty', () => {
        registration.clickFieldAndBlur(registration.firstNameField)
            .validateFieldError(registration.firstNameField, false, 'Name required');
    });

    it('Should show error if first name invalid', () => {
        registration.fillFirstName(' ').clickFieldAndBlur(registration.lastNameField)
            .validateFieldError(registration.lastNameField, false,
                ['Name is invalid', 'Name has to be from 2 to 20 characters long']);
    });

    it('Shouldn\'t show error if first name is valid', () => {
        registration.fillFirstName('Alina').clickFieldAndBlur(registration.firstNameField)
            .validateFieldError(registration.firstNameField, true);
    });

    it('Should show error if last name is empty', () => {
        registration.clickFieldAndBlur(registration.lastNameField)
            .validateFieldError(registration.lastNameField, false, 'Last name required');
    });

    it('Should show error if last name invalid', () => {
        registration.fillLastName(' ').clickFieldAndBlur(registration.emailField)
            .validateFieldError(registration.emailField, false,
                ['Last name is invalid', 'Last name has to be from 2 to 20 characters long']);
    });

    it('Shouldn\'t show error if last name is valid', () => {
        registration.fillLastName('Sakidon').clickFieldAndBlur(registration.lastNameField)
            .validateFieldError(registration.lastNameField, true);
    });

    it('Should show error if email is empty', () => {
        registration.clickFieldAndBlur(registration.emailField)
            .validateFieldError(registration.emailField, false, 'Email required');
    });

    it('Should show error if email invalid', () => {
        registration.fillEmail('asakidongmail.com ').clickFieldAndBlur(registration.passwordField)
            .validateFieldError(registration.passwordField, false, 'Email is incorrect');
    });

    it('Shouldn\'t show error if email is valid', () => {
        registration.fillEmail('alinasakidon@gmail.com').clickFieldAndBlur(registration.emailField)
            .validateFieldError(registration.emailField, true);
    });

    it('Should show error if password is empty', () => {
        registration.clickFieldAndBlur(registration.passwordField)
            .validateFieldError(registration.passwordField, false, 'Password required');
    });

    it('Should validate passwords correctly', () => {
        const testData = [
            { password: '123', shouldShowError: true },
            { password: 'abcdefgH', shouldShowError: true },
            { password: '12345ABCDE', shouldShowError: true },
            { password: '12345abcdef', shouldShowError: true },
            { password: 'Valid123', shouldShowError: false }
        ];

        testData.forEach(({ password, shouldShowError }) => {
            registration.fillPassword(password).clickFieldAndBlur(registration.passwordField);

            if (shouldShowError) {
                registration.validateFieldError(registration.passwordField, false,
                    'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            } else {
                registration.validateFieldError(registration.passwordField, true);
            }
        });
    });

    it('Shouldn\'t show error if password is valid', () => {
        registration.fillPassword('Valid123').clickFieldAndBlur(registration.passwordField)
            .validateFieldError(registration.passwordField, true);
    });

    it('Should show error if re-enter password is empty', () => {
        registration.clickFieldAndBlur(registration.reEnterPasswordField)
            .validateFieldError(registration.reEnterPasswordField, false, 'Re-enter password required');
    });

    it('Should show error if re-enter password invalid', () => {
        registration.fillPassword('Valid123')
            .fillReEnterPassword('Valid123 ').clickFieldAndBlur(registration.reEnterPasswordField)
            .validateFieldError(registration.reEnterPasswordField, false,
                'Passwords do not match');
    });

    it('Shouldn\'t show error if re-enter password is valid', () => {
        registration.fillPassword('Valid123').fillReEnterPassword('Valid123')
            .clickFieldAndBlur(registration.reEnterPasswordField)
            .validateFieldError(registration.reEnterPasswordField, true);
    });
});