import BasePage from './BasePage';

class ProfilePage extends BasePage {
    constructor() {
        super();
        this.profileName = '.profile_name';
    }

    getProfileName() {
        return cy.get(this.profileName).first();
    }
}
export default ProfilePage;

