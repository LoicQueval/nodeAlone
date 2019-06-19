import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostelsModel} from "../hostels.model";
import {tap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-hostels',
  templateUrl: './hostels.component.html',
  styleUrls: ['./hostels.component.scss']
})
export class HostelsComponent {

  hostels: HostelsModel[];
  hostelForm: FormGroup;
  isLoading = false;
  isReading = false;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
  }

  get name(){
    return this.hostelForm.get('name')
  }
  get director(){
    return this.hostelForm.get('director')
  }
  get stars(){
    return this.hostelForm.get('stars')
  }
  get roomNumber(){
    return this.hostelForm.get('roomNumber')
  }
  get pool(){
    return this.hostelForm.get('pool')
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.hostelForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      director: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      stars: [0, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      roomNumber: [0, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      pool: ["true or false", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    })
  }

  submitForm() {
    console.log(this.hostelForm.value);
    this.postHostel(this.hostelForm.value)
  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.http.get<HostelsModel[]>("http://localhost:4000")
      .pipe(
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  postHostel(hostel : HostelsModel) {
    //CreateToNothing
    this.isLoading = true;
    this.http.post<HostelsModel[]>('http://localhost:4000/add', hostel)
      .pipe(
        tap(()=> this.isLoading = false)
      )
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
