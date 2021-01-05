import { ProxyState } from "../AppState.js"
import { carsService } from "../Services/CarsService.js"

function _drawCars() {
  console.log(5)
  let cars = ProxyState.cars
  let template = ''
  cars.forEach(car => {
    // NOTE Getters FAKE properties as methods
    template += car.Template
  })
  document.getElementById('cars').innerHTML = template
}


export default class CarsController {
  constructor() {
    ProxyState.on("cars", _drawCars)
    _drawCars()
    this.getCars()
  }

  getCars(){
    try {
      carsService.getCars()
    } catch (error) {
      console.error(error)
    }
  }

  createCar() {
    window.event.preventDefault()
    console.log("creating car", 1)
    let form = window.event.target
    let newCar = {
      make: form['make'].value,
      model: form['model'].value,
      year: form['year'].value,
      price: form['price'].value,
      description: form['description'].value,
      imgUrl: form['imgUrl'].value
    }
    try {
      carsService.createCar(newCar)
      
    } catch (error) {
      console.error(error)
    }

    console.log(7)
    // @ts-ignore
    form.reset()
    // @ts-ignore
    $("#new-car-modal").modal('hide');
  }


  deleteCar(id) {
    console.log(id);
    try {
      carsService.deleteCar(id)
    } catch (error) {
      console.error(error)
    }
  }

  bid(id, price){
    try {
      console.log(id, price)
      carsService.bid(id, price)
    } catch (error) {
      console.error(error)
    }
  }

  getOne(){
    let id = ProxyState.cars[0].id
    carsService.getOne(id)
  }
}