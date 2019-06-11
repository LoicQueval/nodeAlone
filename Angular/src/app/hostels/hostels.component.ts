import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostelsModel} from "../hostels.model";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

//import {HostelsModel} from "../../../../nodeAlone/hostels.model";

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  hostels: HostelsModel[];
  hostels$: Observable<HostelsModel[]>;


  test1() {
    //Read
    this.hostels$ = this.http.get<HostelsModel[]>("http://localhost:4000");
    this.hostels$
      .pipe(
        tap((hostels: HostelsModel[]) => this.hostels = hostels)
      )
      .subscribe();
    console.log('coucou')
  }

  test2() {
    //CreateToNothing
    this.http.post<HostelsModel[]>('http://localhost:4000/add', {
      "name": "hotel des class",
      "director": "Sarida",
      "pool": true,
      "stars": 1,
      "roomNumber": 43
    })
      .pipe()
      .subscribe();
  }

  test3() {
    //Delete
    this.http.delete<HostelsModel[]>('http://localhost:4000/sup/wV1VltYxvnRpD2s3kS83')
      .pipe()
      .subscribe();
  }

  test4() {
    //Update
    this.http.put<HostelsModel[]>('http://localhost:4000/update/bnzY2faEXawvwhAR6I1n', {
      "name": "hotel des class",
      "director": "Sarida",
      "pool": true,
      "stars": 1,
      "roomNumber": 123
    })
      .pipe()
      .subscribe();
  }

  test5() {
    //CreateToSomething
    this.http.patch<HostelsModel[]>('http://localhost:4000/modif/bnzY2faEXawvwhAR6I1n', {
      "name": "hotel des for",
    })
      .pipe()
      .subscribe();
  }


  ngOnInit() {

  }
}
