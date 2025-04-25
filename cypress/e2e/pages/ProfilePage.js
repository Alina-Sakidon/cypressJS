import MainPage from './MainPage';

class ProfilePage extends MainPage {
    constructor() {
        super();
        this.profileName = '.profile_name';
    }

    getProfileName() {
        return cy.get(this.profileName).first();
    }
}
export default ProfilePage;

