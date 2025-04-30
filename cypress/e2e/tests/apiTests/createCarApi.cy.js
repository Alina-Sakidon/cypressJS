import GaragePage from '../../pages/GaragePage.js';
import Car from '../../../support/Car.js';
import { CarBrands, CarModels } from '../../../support/carData.js';
import '../../../support/commands.js';

describe('Add a car', () => {
  const garagePage = new GaragePage();
  const randomMileage = Math.floor(Math.random() * (99999 - 101 + 1)) + 101;
  const car = new Car('Ford', CarModels.FOCUS, randomMileage);


  beforeEach(() => {
    cy.loginViaApi();
  })

  it('Create a car and validate response', () => {
    cy.intercept('POST', '/api/cars').as('createCar');

    garagePage.getCarListLength().then((lengthBefore) => {
      garagePage.addCar(car.brand, car.model, car.mileage)
        .waitForCarListToLoad(lengthBefore);

      cy.wait('@createCar').then((interception) => {
        expect(interception.response.statusCode).to.eq(201);
        expect(interception.response.body).to.exist;

        console.log('Response body data:', interception.response.body.data); // Выводим тело
        const carId = interception.response.body.data.id;
        expect(carId).to.exist;
        cy.wrap(carId).as('createdCarId');
      });

    })
  });

  it('Checking car list after creating a car', () =>
    cy.get('@createdCarId').then((carId) => {
      cy.request({
        method: 'GET',
        url: '/api/cars'
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('authToken')}` // або використай свій метод отримання токену
        // }
      })
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property('data');

          const cars = response.body.data;

          
          const createdCar = cars.find(car => car.id === carId);
          expect(createdCar).to.exist;
          expect(createdCar.brand).to.eq(car.brand);
          expect(createdCar.model).to.eq(car.model);
          expect(createdCar.mileage).to.eq(car.mileage);
        });
    }));
})

