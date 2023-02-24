import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeDataService } from 'src/app/services/data/employee-data.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
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
    this.employeeDataService.put(this.employee)
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
    let username:string = this.activatedRoute.snapshot.params['username'];
    this.employeeDataService.get(username)
    .subscribe({
      next:r=>{
        this.employee=r;
        console.log(this.employee);
        this.employeeForm.patchValue(this.employee)
      },
      error:err=>{
        this.notifyService.fail("Failed to load profile", "DISMISS");
      }
    });
  }
}
