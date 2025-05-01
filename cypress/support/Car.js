class Car {
    constructor(brand, model, mileage, createdAt = null, id = null) {
      this.brand = brand;
      this.model = model;
      this.mileage = mileage;
      this.createdAt = createdAt;
      this.id = id;
    }

    static fromApiData(data) {
      return new Car(
        data.brand,
        data.model,
        data.mileage,
        data.createdAt || null,
        data.id || null
      );
    }
  
    setId(id) {
      this.id = id;
    }
  
    equalsApiData(apiCar) {
      return (
        this.brand === apiCar.brand &&
        this.model === apiCar.model &&
        this.mileage === apiCar.mileage &&
        (!this.id || this.id === apiCar.id)
      );
    }
  
    toJSON() {
      return {
        id: this.id,
        brand: this.brand,
        model: this.model,
        mileage: this.mileage,
        createdAt: this.createdAt
      };
    }
  }
  
  export default Car;
  