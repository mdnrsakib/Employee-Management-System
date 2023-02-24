import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeDataService } from 'src/app/services/data/employee-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employee:EmployeeViewModel={};
  maritalStatusOptions: { label: string, value: number }[] = [];

  constructor(
    private employeeDataService:EmployeeDataService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ){{}}
  ngOnInit(): void {
    let username:string = this.activatedRoute.snapshot.params['username'];
    this.employeeDataService.get(username)
    .subscribe({
      next:r=>{
        this.employee=r;
        console.log(this.employee);
       
      },
      error:err=>{
        this.notifyService.fail("Failed to load profile", "DISMISS");
      }
    });
  }
}
