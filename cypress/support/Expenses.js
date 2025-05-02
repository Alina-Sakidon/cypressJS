class Expense {
    constructor(carId, mileage, liters, totalCost, reportedAt = null, id = null) {
      this.carId = carId;
      this.reportedAt = reportedAt || Expense.getTodayAtMidnight();
      this.mileage = mileage;
      this.liters = liters;
      this.totalCost = totalCost;
      this.id = id;
    }

    static getTodayAtMidnight() {
        const todayAtMidnight = new Date();
        todayAtMidnight.setUTCHours(0, 0, 0, 0);
        return todayAtMidnight.toISOString();
      }
  
    static fromApiData(data) {
      return new Expense(
        data.carId,
        data.mileage,
        data.liters,
        data.totalCost,
        data.reportedAt || null,
        data.id || null
      );
    }
  
    setId(id) {
      this.id = id;
    }
  
    equalsApiData(apiExpense) {
      return (
        this.carId === apiExpense.carId &&
        this.mileage === apiExpense.mileage &&
        this.liters === apiExpense.liters &&
        this.totalCost === apiExpense.totalCost &&
        (!this.id || this.id === apiExpense.id)
      );
    }
  
    toJSON() {
      return {
        id: this.id,
        carId: this.carId,
        reportedAt: this.reportedAt,
        mileage: this.mileage,
        liters: this.liters,
        totalCost: this.totalCost
      };
    }
  }
  
  export default Expense;
  