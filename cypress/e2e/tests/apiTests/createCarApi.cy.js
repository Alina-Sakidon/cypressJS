import GaragePage from '../../pages/GaragePage.js';
import Car from '../../../support/Car.js';
import { CarModels } from '../../../support/carData.js';
import '../../../support/commands.js';
import Expense from '../../../support/Expenses.js';
import ExpensesPage from '../../pages/ExpensesPage.js';
import { navigateToPageWithText } from '../../../support/utils/actions.js';

describe('Add a car', () => {
  const garagePage = new GaragePage();
  const expensesPage = new ExpensesPage();
  const randomMileage = Math.floor(Math.random() * (99999 - 101 + 1)) + 101;
  const car = new Car('Ford', CarModels.FOCUS, randomMileage);

  beforeEach(() => {
    cy.loginAndVisitUI('/panel/garage');
  });


  it('creates a car through UI and saves ID to fixture', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    garagePage.getCarListLength().then((lengthBefore) => {
      garagePage.addCar(car.brand, car.model, car.mileage)
        .waitForCarListToLoad(lengthBefore);
      cy.wait('@createCar').then(({ response }) => {
        expect(response.statusCode).to.eq(201);
        const { id, createdAt } = response.body.data;

        car.setId(id);
        car.createdAt = createdAt;

        cy.writeFile('cypress/fixtures/createdCar.json', {
          id: car.id,
          brand: car.brand,
          model: car.model,
          mileage: car.mileage,
          createdAt: car.createdAt
        });
      });
    });
  });

  it('validates the created car via API using fixture', () => {

    cy.fixture('createdCar.json').then((carFromFixture) => {
      expect(carFromFixture.id, 'Car ID must exist').to.exist;

      cy.request({
        method: 'GET',
        url: '/api/cars',
        withCredentials: true
      }).then((res) => {
        expect(res.status).to.eq(200);
        const cars = res.body.data;
        const createdCar = cars.find(c => c.id === carFromFixture.id);

        expect(createdCar).to.exist;
        const carFromApi = Car.fromApiData(createdCar);
        expect(car.equalsApiData(carFromApi)).to.be.true;
      });
    });
  });

  it('Create expenses for the created car', () => {
    cy.fixture('createdCar.json').then((carFromFixture) => {
      const expenseForApi = new Expense(
        carFromFixture.id,
        randomMileage + 10,
        10,
        10,
        Expense.getTodayAtMidnight()
      );

      cy.createExpenseViaApi(expenseForApi).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.exist;

        const createdExpenseFromApi = Expense.fromApiData(response.body.data);

        cy.writeFile('cypress/fixtures/createdExpense.json', createdExpenseFromApi);

        expect(expenseForApi.equalsApiData(createdExpenseFromApi)).to.be.true;
      });
    });
  });

  it('Validate UI expenses for created car', () => {
    cy.fixture('createdExpense.json').then((expected) => {
      navigateToPageWithText('/panel/expenses', 'Fuel expenses');

      expensesPage
        .verifyAndSelectCar(car.brand, car.model)
        .verifyExpenseTableRow(expected);
    });
  });
});
