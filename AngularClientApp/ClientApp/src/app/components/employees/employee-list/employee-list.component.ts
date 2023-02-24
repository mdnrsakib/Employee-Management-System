import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeDataService } from 'src/app/services/data/employee-data.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
  
  employees:EmployeeViewModel[]=[];
  columns =['userName', 'email','department','currentPostion','roles', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  dataSource:MatTableDataSource<EmployeeViewModel> = new MatTableDataSource(this.employees);
  constructor(
    private employeeDataService:EmployeeDataService,
    private notifyService:NotifyService,
    private matDialog:MatDialog
  ){}
  confirmDelete(data:EmployeeViewModel){
    //console.log(data);
    this.matDialog.open(ConfirmDialogComponent, {
      width: '450px',
      enterAnimationDuration: '500ms'
    }).afterClosed()
    .subscribe(result=>{
      //console.log(result);
      if(result){
        this.employeeDataService.delete(data)
        .subscribe({
          next: r=>{
            this.notifyService.success('Employee removed', 'DISMISS');
            this.dataSource.data = this.dataSource.data.filter(c => c.id != data.id);
          },
          error:err=>{
            this.notifyService.fail('Failed to delete data', 'DISMISS');
            throwError(()=>err);
          }
        })
      }
    })
  }
  ngOnInit(): void {
    this.employeeDataService.getVM()
    .subscribe({
      next:r=>{
        this.employees=r;
        this.dataSource.data = this.employees;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator= this.paginator;
        console.log(this.employees)

      },
      error:err=>{
        this.notifyService.fail('Failed to employee records@Component', "DISMISS")
      }
    })
  }
}
