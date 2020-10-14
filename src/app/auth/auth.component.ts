import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  title = 'Registration';
  loginForm: FormGroup;
  isLoading: boolean;
  error_messages = {
    'name': [
      { type: 'required', message: 'First Name is required.' },
    ],
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
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'address': [
      { type: 'required', message: 'Address is required.' },
    ],
  }

  constructor(
    private restApi: CommonService,
    private fb: FormBuilder,
    private _router: Router,
    private _toastrService: ToastrService
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
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
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
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
    }, {
      validators: this.password.bind(this)
    });
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : {
      passwordNotMatch: true
    };
  }

  register() {
    let vLink = ['login'];
    this.isLoading = true;
    this.restApi.register(this.loginForm.value).subscribe(
      (data: {}) => {
        this._toastrService.success('User Created Successfully');
        this._router.navigate(vLink);
        this.isLoading = false;
      },
    (err)=>{
      this.isLoading = false;
    });
  }

  ngOnInit() {
  }

}
