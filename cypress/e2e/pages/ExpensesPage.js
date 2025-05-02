import { th } from "@faker-js/faker";
import BasePage from "./BasePage";

class ExpensesPage extends BasePage {
    constructor() {
        super();
        this.carDropdown = '#carSelectDropdown';
    }

    verifyAndSelectCar(brand, model) {
        cy.get(this.carDropdown).should('be.visible')
            .then($button => {
                const currentCarText = $button.text().trim();
                const expectedCarText = `${brand} ${model}`;
                if (currentCarText !== expectedCarText) {
                    cy.log(`Currently selected car is "${currentCarText}", changing to "${expectedCarText}"`);
                    cy.get(this.carDropdown).click();
                    cy.get('.car-select-dropdown_menu')
                        .should('be.visible')
                        .find('.car-select-dropdown_item:not(.disabled)')
                        .contains(expectedCarText)
                        .click();
                } else {
                    cy.log(`The correct car "${expectedCarText}" is already selected.`);
                }
            });
        return this;
    }

    verifyExpenseTableRow(expected) {
        const dateObj = new Date(expected.reportedAt);
        if (isNaN(dateObj)) {
            throw new Error(`Invalid date format: ${expected.reportedAt}`);
        }

        const formattedDate = dateObj.toLocaleDateString('en-GB').replace(/\//g, '.');

        cy.get('.expenses_table thead th').then($headers => {
            const headerTexts = [...$headers].map(h => h.innerText.trim());
            const expectedHeaders = ['Date', 'Mileage', 'Liters used', 'Total cost'];
            expect(headerTexts.slice(0, 4)).to.deep.eq(expectedHeaders);
        });

        cy.get('.expenses_table tbody tr')
            .contains('td', formattedDate)
            .parents('tr')
            .within(() => {
                cy.get('td').eq(0).should('have.text', formattedDate);
                cy.get('td').eq(1).should('have.text', expected.mileage.toString());
                cy.get('td').eq(2).should('have.text', `${expected.liters}L`);
                cy.get('td').eq(3).should('have.text', `${expected.totalCost.toFixed(2)} USD`);
            });
    }
}

export default ExpensesPage;
