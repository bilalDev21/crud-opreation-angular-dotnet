import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../Interfaces/Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent {
  formBuilder = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  toaster = inject(ToastrService);

  employeeForm = this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    age:['',[Validators.required]],
    phone:['',[]],
    salary:['',[Validators.required]],
  });

  employeeId!: number;
  isEdit = false;
  ngOnInit(){
    this.employeeId = this.route.snapshot.params['id'];
    if(this.employeeId){
      this.isEdit = true;
      this.httpService.getEmployee(this.employeeId).subscribe(result =>{
        console.log(result);
        this.employeeForm.patchValue(result);
      })
    }
  }

  Save(){
    console.log(this.employeeForm.value);
    const employee:IEmployee = {
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      age: this.employeeForm.value.age!,
      phone: this.employeeForm.value.phone!,
      salary: this.employeeForm.value.salary!,
    };
    if(this.isEdit){
      this.httpService.updateEmployee(this.employeeId,employee).subscribe(() => {
        console.log("success");
        this.toaster.success("record updated sucessfully");
        this.router.navigateByUrl("/employee-list");
      });
    }else{
      this.httpService.CreatEmployee(employee).subscribe(()=>{
        console.log("success");
        this.toaster.success("record added sucessfully");
        this.router.navigateByUrl("/employee-list");
      });
    } 
  }
}
