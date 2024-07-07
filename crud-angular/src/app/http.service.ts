import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './Interfaces/Employee';

@Injectable({
  providedIn: 'root'
})      
export class HttpService {
  apiUrl = "https://localhost:7235"
  http = inject(HttpClient);
  constructor() { }
  
  getAllEmployee(){
    return this.http.get<IEmployee[]>(this.apiUrl + '/api/Employee');
  }

  CreatEmployee(employee:IEmployee){
    return this.http.post(this.apiUrl + '/api/Employee', employee);
  }

  getEmployee(employeeId:number){
    return this.http.get<IEmployee>(this.apiUrl + '/api/Employee/'+employeeId);
  }

  updateEmployee(employeeId:number,employee:IEmployee){
    return this.http.put<IEmployee>(this.apiUrl + '/api/Employee/'+employeeId,employee);
  }

  deleteEmployee(employeeId:number){
    return this.http.delete(this.apiUrl + '/api/Employee/'+employeeId);
  }
}
