import BasePage from "./BasePage";
import { CarBrands } from '../../support/carData.js';
import { CarModels } from '../../support/carData.js';
import { selectOption, selectOptionByText } from "../../support/utils/actions";
import 'cypress-xpath';
import { th } from "@faker-js/faker";


class GaragePage extends BasePage {
    constructor() {
        super();
        this.addCarButtonToGarage = '//button[text()="Add car"]';
        this.brandInput = '#addCarBrand';
        this.modelInput = '#addCarModel';
        this.mileageInput = '#addCarMileage';
        this.addButton = '//button[text()="Add"]';
        this.carList = '.car-list';
        this.carListItem = 'app-car';
        this.numberOfLitersInput = '#addExpenseLiters';
        this.totalCostInput = '#addExpenseTotalCost';
        this.expenseMileageInput = '#addExpenseMileage';
    }

    addCar(brand, model, mileage) {
        cy.xpath(this.addCarButtonToGarage).click();
        selectOption(this.brandInput, CarBrands[brand]);
        cy.get(this.modelInput).should('not.be.disabled')
        selectOptionByText(this.modelInput, CarModels[model]);
        this.enterMileage(mileage);
        this.clickAddButton();
        return this;
    }

    selectCarBrand(selector, brand) {
        cy.get(selector)
            .select(CarBrands[brand]);
    }

    selectBrand(brand) {
        selectOption(this.brandInput, CarBrands[brand]);
    }

    selectModel(model) {
        selectOption(this.modelInput, model);
    }

    enterMileage(mileage) {
        cy.get(this.mileageInput).clear().type(mileage);
        return this;
    }

    clickAddButton() {
        cy.xpath(this.addButton).should('exist').and('be.visible')
            .and('not.be.disabled')
            .click();
        return this;
    }

    addNumberOfLiters(liters) {
        cy.get(this.numberOfLitersInput).clear().type(liters);
        return this;
    }

    addTotalCost(cost) {
        cy.get(this.totalCostInput).clear().type(cost);
        return this;
    }

    getCarListLength() {
        return cy.get(this.carList).find(this.carListItem).then($elements => $elements.length);
    }

    waitForCarListToLoad(expectedMinLength = 0) {
        cy.get(this.carList)
            .should('be.visible')
            .and('not.have.class', 'loading');

        cy.get(this.carList)
            .find(this.carListItem)
            .should('have.length.greaterThan', expectedMinLength);
    }
    clickAddExpenseForCar(brand, model, lastUpdated = null) {
        const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
        const targetDate = lastUpdated ?? today;
        const fullName = `${brand} ${model}`;
    
        // Найти и кликнуть на нужный элемент
        cy.get(this.carListItem).then($cars => {
            const matchedCar = [...$cars].reverse().find(car => {
                const nameText = car.querySelector('.car_name')?.innerText.trim();
                const updateText = car.querySelector('.car_update-mileage')?.innerText.trim();
                return (
                    nameText === fullName &&
                    updateText?.includes(`Update mileage • ${targetDate}`)
                );
            });
    
            expect(matchedCar, `Car ${fullName} with updated mileage on ${targetDate} found`).to.exist;
            cy.wrap(matchedCar).find('.car_add-expense').click();
        });
        return this;
    }
    

    addExpenseMileage(mileage) {
        cy.get(this.expenseMileageInput).clear().type(mileage);
        return this;
    }

    validateAlertMessage(expectedText) {
        cy.xpath(this.addButton)
            .should('exist')
            .and('be.disabled');

        return cy.get('app-alert-list p', { timeout: 5000 })
            .should('be.visible')
            .and('contain.text', expectedText);
    }
}

export default GaragePage;