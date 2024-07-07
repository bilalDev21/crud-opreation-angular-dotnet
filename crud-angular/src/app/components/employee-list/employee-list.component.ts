import { Component, inject } from '@angular/core';
import { IEmployee } from '../../Interfaces/Employee';
import { HttpService } from '../../http.service';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent {
  router = inject(Router);
  toaster = inject(ToastrService);

  employeeList:IEmployee[]=[];
  httpService = inject(HttpService);
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'phone', 'salary', 'action'];

  ngOnInit(){
    this.httpService.getAllEmployee().subscribe(result =>{
      this.employeeList = result;
      console.log(this.employeeList);
      });
  }

  Edit(id:number){
    console.log(id);
    this.router.navigateByUrl("/employee/"+id);
  }

  delete(id:number){
    this.httpService.deleteEmployee(id).subscribe(()=>{
      console.log("deleted");
      this.employeeList = this.employeeList.filter(x => x.id!=id);
      this.toaster.success("record deleted sucessfully");
    })
  }

}
