import { ProxyState } from "../AppState.js"
import Car from "../Models/Car.js"
import {api} from "./AxiosService.js"

class CarsService {
 
 async getCars() {
    let res  = await api.get("cars")
    console.log(res.data)
    ProxyState.cars = res.data.map(c=> new Car(c))
  }

  async createCar(newCar) {
    let car = await api.post("cars", newCar)
    console.log(car);

    // ProxyState.cars = [...ProxyState.cars, new Car(car.data)]

    this.getCars()
  }


  async deleteCar(id) {
    let res  = await api.delete("cars/"+id)
    console.log(res)

    ProxyState.cars = ProxyState.cars.filter(car => car.id != id)

    // this.getCars()

  }

  async bid(id, newPrice) {
    let carData = { price : newPrice }
    let res = await api.put("cars/"+id, carData)
    console.log(res);
    let oldCarIndex = ProxyState.cars.findIndex(c=> c.id ==id)
  
    let temp = ProxyState.cars
    temp.splice(oldCarIndex,1,new Car(res.data))
    ProxyState.cars = temp
    
    // this.getCars()

  }



   async getOne(id){
     //typically you would take in an id from your controller and pass that onto your api
    let res = await api.get("cars/"+id)
    console.log(res)
  }
}

//GET
//URL/api/collection

//GETBYID
//URL/api/collection/someId

//PUT
//URL/api/collection/someId, whatWeAreEditing

//POST
//URL/api/collection , whatWeArePosting

//DELETE
//URL/api/collection/someId
//api.delete(id)



// Singleton Pattern
export const carsService = new CarsService()