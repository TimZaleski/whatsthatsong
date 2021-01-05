import { generateId } from "../Utils/GenerateId.js"

export default class Car {
  constructor({ make, model, year, price, description, imgUrl, id }) {
    console.log("MODEL: constructor", 3)
    this.id = id
    this.make = make
    this.model = model
    this.year = year
    this.price = price
    this.description = description
    this.imgUrl = imgUrl
  }

  get Template() {
    return `
    <div class="col-md-4 col-6 mt-3">
    <div class="card">
        <img class="card-img-top" src="${this.imgUrl}" alt="">
        <div class="card-body">
            <h4 class="card-title">${this.make} - ${this.model} - ${this.year}</h4>
            <p class="card-text">${this.description}</p>
            <p class="card-text">${this.price}</p>
            <div class="text-right">
            <button type="button" class="btn btn-success" onclick="app.carsController.bid('${this.id}', '${this.price += 500}')">Bid</button>
                <button type="button" class="btn btn-danger" onclick="app.carsController.deleteCar('${this.id}')">Delete</button>
            </div>
        </div>
    </div>
    </div>
        `
  }
}