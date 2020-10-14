import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { RegistrationRequest } from './shared/models/registrationRequest';
import { LoginRequest } from './shared/models/login';
import { ProductRequest } from './shared/models/products';
import { CartRequest } from './shared/models/cart';
import { Router } from '@angular/router';
var toast = this;
var router = this;


import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  // Define API
  apiURL = 'http://localhost:3000/api';
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  httpOptionsToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('token')
  })
  }

  constructor(private http: HttpClient, private _toastrService: ToastrService, private _router: Router) {
    toast = _toastrService;
    router =_router;

  }


  register(auth): Observable<RegistrationRequest> {
    return this.http.post<RegistrationRequest>(this.apiURL + '/signup', JSON.stringify(auth), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError),
      );
  }

  login(auth): Observable<LoginRequest> {
    return this.http.post<LoginRequest>(this.apiURL + '/login', JSON.stringify(auth), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError),
      );
  }

  addtocart(cart): Observable<CartRequest> {
    return this.http.post<CartRequest>(this.apiURL + '/addtocart', JSON.stringify(cart), this.httpOptionsToken)
      .pipe(
        retry(0),
        catchError(this.handleError),
      );
  }



  getCarts(cart) {
    return this.http.post<CartRequest>(this.apiURL + '/getcartdetails', JSON.stringify(cart), this.httpOptionsToken)
      .pipe(
        retry(0),
        catchError(this.handleError),
      );
  }

  clearCarts(cart) {
    return this.http.post<CartRequest>(this.apiURL + '/clearcartdetails', JSON.stringify(cart), this.httpOptionsToken)
      .pipe(
        retry(0),
        catchError(this.handleError),
      );
  }

  products() {
    this.httpOptionsToken = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
     return this.http.get<ProductRequest>(this.apiURL + '/products', this.httpOptionsToken)
      .pipe(
        retry(0),
        catchError(this.handleError),
      );
  }


  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error && error.error && error.error.desc) {
      // Get client-side error
      errorMessage = error.error.desc;
      if(error.error.code == 300){
        localStorage.clear();
        let vLink = ["login"]
        router.navigate(vLink);
      }
    } else {
      errorMessage = 'Something is wrong,Please try again later';

    }
    if(errorMessage){
      toast.error(errorMessage);
    }
    return throwError(errorMessage);
  }

}
