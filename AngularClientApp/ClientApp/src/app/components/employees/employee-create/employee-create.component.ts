import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeDataService } from 'src/app/services/data/employee-data.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit{
  employee:EmployeeViewModel={};
  employeeForm:FormGroup= new FormGroup({
    userName:new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email]),
    phoneNumber:new FormControl('', Validators.required),
    address: new FormControl(''),
    joinDate:new FormControl(undefined),
    currentPostion: new FormControl(''),
    department:new FormControl('')
  });
  get f(){
    return this.employeeForm.controls;
  }
  constructor(
    private employeeDataService:EmployeeDataService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
  save(){
    if(this.employeeForm.invalid) return;
    
    Object.assign(this.employee, this.employeeForm.value);
    console.log(this.employee);
    this.employeeDataService.post(this.employee)
    .subscribe({
      next:r=>{
        this.notifyService.success('Data updated', "DISMISS")
      },
      error:err=>{
        this.notifyService.fail("Data update failed", "DISMISS");
      }
    })
  }
  ngOnInit(): void {
    
  }
}