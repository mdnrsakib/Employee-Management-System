import { Roles } from "../constants/enum-data";

export interface EmployeeViewModel {
    id?:string;
    userName?:string|undefined;
    email?:string|undefined;
    phoneNumber?:string;
    address?:string;
    joinDate?:Date;
    department?:string;
    currentPostion?:string;
    roles?:Roles;
}
