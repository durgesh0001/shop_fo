import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Registration';
  loginForm: FormGroup;
  isLoading: boolean;

  error_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'required', message: 'please enter a valid email address.' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }

  constructor(private fb: FormBuilder,
              private _router: Router,
              private restApi: CommonService
  ) {
    let nLink:any = ['products']
    let token:any = localStorage.getItem('token');
    this.isLoading = false;
    if(token){
      this._router.navigate(nLink);
    }
    else{
      this.createForm();
    }
  }
  createForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, {
    });
  }

  ngOnInit() {
  }
  login() {
    let vLink = ['products'];
    this.isLoading = true;
    this.restApi.login(this.loginForm.value).subscribe((data: {}) => {
        this.isLoading = false;
      let token:any = data['data'];
      let userId:any = data['userId'];
      localStorage.setItem('token',token);
      localStorage.setItem('userid',userId);
      if(localStorage.getItem('token')){
        this._router.navigate(vLink);
      }
    },
    (err)=>{
      this.isLoading = false;
    });
  }

}
