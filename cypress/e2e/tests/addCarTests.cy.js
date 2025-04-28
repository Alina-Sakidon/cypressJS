import '../../support/commands.js';
import GaragePage from '../pages/GaragePage.js';
import Car from '../../support/Car.js';

describe('Add a car', () => {

    const garagePage = new GaragePage();
    const car = new Car('BMW', 'X5', 100);

    beforeEach(() => {
        cy.loginFromEnv();
    })

    it('Add a car', () => {
        garagePage.getCarListLength().then((lengthBefore) => {
            garagePage.addCar(car.brand, car.model, car.mileage)
                .waitForCarListToLoad(lengthBefore);

            garagePage.getCarListLength()
                .should('be.gt', lengthBefore);
        })
    });

    it('Add an expenses', () => {
        garagePage.clickAddExpenseForCar(car.brand, car.model)
            .addExpenseMileage('4000')
            .addNumberOfLiters(10)
            .addTotalCost(100)
            .clickAddButton()
            .validateAlertMessage('Fuel expense added')
    });
})
