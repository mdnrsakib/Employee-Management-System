import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from 'src/app/models/constants/AppConstants';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private http:HttpClient) { }
  getVM():Observable<EmployeeViewModel[]>{
    return this.http.get<EmployeeViewModel[]>(`${ApiUrl}/api/Employees/VM`);
  }
  get(username:string):Observable<EmployeeViewModel>{
    return this.http.get<EmployeeViewModel>(`${ApiUrl}/api/Employees/VM/${username}`)
  }
  put(data:EmployeeViewModel):Observable<EmployeeViewModel>
  {
    return this.http.put<EmployeeViewModel>(`${ApiUrl}/api/Employees`, data)
  }
  post(data:EmployeeViewModel):Observable<EmployeeViewModel>{
    return this.http.post<EmployeeViewModel>(`${ApiUrl}/api/Employees`, data);
  }  
  delete(data:EmployeeViewModel):Observable<any>{
    return this.http.delete<any>(`${ApiUrl}/api/Employees/${data.id}`);
  }
}
