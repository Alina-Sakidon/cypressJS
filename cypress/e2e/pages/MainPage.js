import BasePage from './BasePage.js';

class MainPage extends BasePage {
    constructor() {
        super();
        this.signUpButton = '.btn-primary';
        this.myProfileButton = '#userNavDropdown';
        this.userDropdownMenu = '.user-nav_menu.dropdown-menu';
        this.profileLink = 'a[routerlink="/panel/profile"]';
        this.logoutButton = '//button[text()="Logout"]';
    }

    visit() {
        cy.visit(this.url);
        return this;
    }

    clickSignUpButton() {
        cy.get(this.signUpButton).click();
    }

    logout() {
        cy.xpath(this.logoutButton).click();
        cy.get(this.myProfileButton).should('not.exist');
        return this;
    }

    openUserDropdown() {
        cy.get(this.myProfileButton).click();
        cy.get(this.userDropdownMenu)
            .should('have.css', 'display', 'block');
        return this;
    }

    goToProfile() {
        cy.get(this.profileLink).click();
        return this;
    }
}

export default MainPage;