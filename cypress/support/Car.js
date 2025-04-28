class Car {
    constructor(brand, model, mileage, createdAt = null) {
        this.brand = brand;
        this.model = model;
        this.mileage = mileage;
        this.createdAt = createdAt; 
      }
}

export default Car;