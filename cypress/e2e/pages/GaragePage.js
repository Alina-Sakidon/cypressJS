import BasePage from "./BasePage";
import { CarBrands } from '../../support/carData.js';
import { CarModels } from '../../support/carData.js';
import { selectOption, waitForElementToBeVisible } from "../../support/utils/actions";
import 'cypress-xpath';


class GaragePage extends BasePage {
    constructor() {
        super();
        this.addCarButtonToGarage = '//button[text()="Add car"]';
        this.brandInput = '#addCarBrand';
        this.modelInput = '#addCarModel';
        this.mileageInput = '#addCarMileage';
        this.addCarButton = '//button[text()="Add"]';
        this.carList = '.car-list';
        this.carListItem = 'app-car';
    }

    addCar(brand, model, mileage) {
        cy.xpath(this.addCarButtonToGarage).click();
        selectOption(this.brandInput, CarBrands[brand]);
        selectOption(this.modelInput, CarModels[model]);
        cy.get(this.mileageInput).clear().type(mileage);
        cy.xpath(this.addCarButton).should('exist').and('be.visible')
            .and('not.be.disabled')
            .click();
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

    selectMileage(mileage) {
        cy.get(this.mileageInput).clear().type(mileage);
    }

    clickAddCarButton() {
        cy.xpath(this.addCarButton).click();
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
}

export default GaragePage;