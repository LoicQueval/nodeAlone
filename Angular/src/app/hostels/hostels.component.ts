import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostelsModel} from "../hostels.model";
import {tap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

//import {HostelsModel} from "../../../../nodeAlone/hostels.model";

@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent {

  hostels: HostelsModel[];
  hostelForm: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getHostels()
  }

  initForm() {
    this.hostelForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5)]]
    })
  }

  submitForm(){
    console.log(this.hostelForm.value);
  }

  getHostels() {
    //Read
    return this.http.get<HostelsModel[]>("http://localhost:4000")
      .pipe(
        tap((hostels: HostelsModel[]) => this.hostels = hostels)
      )
      .subscribe();
  }

  postHostel() {
    //CreateToNothing
     return this.http.post<HostelsModel[]>('http://localhost:4000', {
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
    this.http.delete<HostelsModel[]>('http://localhost:4000/sup/1QO7AgQpf5RABNGPI9Br')
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

}
