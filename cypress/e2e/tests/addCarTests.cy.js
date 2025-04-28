import '../../support/commands.js';
import GaragePage from '../pages/GaragePage.js';
import Car from '../../support/Car.js';

describe('Add a car', () => {

    const garagePage = new GaragePage();
    const car = new Car('BMW', 'X5', 10000);

    before(() => {
        cy.loginFromEnv();
    })

    it('Add a car', () => {
        let lengthBefore;
        garagePage.getCarListLength().then((lengthBefore) => {
            garagePage.addCar(car.brand, car.model, car.mileage);

            garagePage.waitForCarListToLoad(lengthBefore);
            garagePage.getCarListLength().should('be.gt', lengthBefore);
            garagePage.clickAddExpenseForCarByDate();
        });
    });
})
