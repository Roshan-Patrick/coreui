import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NurseRegService {

  private baseUrl = environment.APIEndpoint;
  private headers=new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient,private router: Router) { }

  nurseRegistration(register: any):Observable<any>{
      return this.http.post(this.baseUrl+'nursing/bookings',register,{headers:this.headers})
      .pipe(
        catchError(this.errorHandler)
      );
  }
  getAllRegistered():Observable<any>{
    return this.http.get(this.baseUrl+'nursing/getBookings',{headers:this.headers})
    .pipe(
      catchError(this.errorHandler)
    );
}

updateBooking(data: any):Observable<any>{
  return this.http.put(this.baseUrl+'nursing/updateBooking',data,{headers:this.headers})
  .pipe(
    catchError(this.errorHandler)
  );
}

deleteBooking(id: any):Observable<any>{
  return this.http.delete(this.baseUrl+`nursing/deleteBookings/${id}`,{headers:this.headers})
  .pipe(
    catchError(this.errorHandler)
  );
}

nurseRegistrationDetails(formData: FormData):Observable<any>{
  return this.http.post(this.baseUrl+'register/registerNurse',formData)
  .pipe(
    catchError(this.errorHandler)
  );
}

nurseRegistered():Observable<any>{
  return this.http.get(this.baseUrl+'register/registrations',{headers:this.headers})
  .pipe(
    catchError(this.errorHandler)
  );
}



  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.msg;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
}

}
