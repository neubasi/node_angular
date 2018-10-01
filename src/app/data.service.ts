import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  ws: WebSocket;
  data: any;

  constructor() {

    this.ws = new WebSocket('ws://localhost:4400/');

    this.ws.onopen = () => {
      this.ws.send('something');
    };

    this.ws.onmessage = (data) => {
      console.log(data.data);
    };
  }

  getDataFromSocket() {
    return new Observable((observer) => {
      this.ws.onmessage = (socketdata) =>
        this.data = observer.next(JSON.parse(socketdata.data))
      //console.log(typeof this.data)
    }
    );
  }
  /*
 //Promise
 getData(){
   return new Promise((resolve, reject) => {
     setInterval(() => {
       resolve(this.data = new Date());   
       console.log("alle 3 Sekunden")
     }, 3000);
         
   })
 }
 */

  /*
    //Observable
    getData() {
      return new Observable((observer) => {
        setInterval(() => {
          this.data = observer.next(new Date());
          console.log("alle 1 Sekunden")
        }, 1000);
      })
    }
  */
}