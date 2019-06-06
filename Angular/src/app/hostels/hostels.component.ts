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

  test(){
    this.hostels$ = this.http.get<HostelsModel[]>("http://localhost:4000");
    this.hostels$
      .pipe(
        tap((hostels: HostelsModel[]) => this.hostels = hostels)
      )
      .subscribe();
    console.log("coucou")
  }

  ngOnInit() {
    this.hostels$ = this.http.get<HostelsModel[]>("http://localhost:4000");
    this.hostels$
      .pipe(
        tap((hostels: HostelsModel[]) => this.hostels = hostels)
      )
      .subscribe();
  }
}