import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'date'];
  dataSource: any;

  constructor(service: DataService) {

    service.getDataFromSocket().subscribe((val => {
      this.dataSource = val;
    }));

    // Promise
    /*
    service.getData().then((value) => {
      this.data = value
    });
    */

    // Observable
    /*
    service.getData().subscribe((val => {
      this.data = val;
    }));
    */

  }
  ngOnInit() {
  }
}
