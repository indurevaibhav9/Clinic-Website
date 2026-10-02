export interface Employee {
  _id: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Role: string;
  Department: string;
  JoiningDate: string;
  __v?: number;
}

export interface ApiResponse {
  message: string;
  data: Employee[];
}