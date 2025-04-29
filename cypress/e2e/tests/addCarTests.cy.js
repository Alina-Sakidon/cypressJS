import '../../support/commands.js';
import GaragePage from '../pages/GaragePage.js';
import Car from '../../support/Car.js';

describe('Add a car', () => {

    const garagePage = new GaragePage();
    const car = new Car('BMW', 'X5', 100);
    const randomMileage = Math.floor(Math.random() * (99999 - 101 + 1)) + 101;

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
            .addExpenseMileage(randomMileage.toString())
            .addNumberOfLiters(10)
            .addTotalCost(100)
            .clickAddButton()
            .validateAlertMessage('Fuel expense added')
    });
})
