import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  containerClass = 'sign-in';
  loginForm: any;
  submitted= false;
  loginFailed=false;
  username_msg: any;
  pwd_msg: any;

  error$: Observable<string> | undefined;
  primaryColor = '#28a745'; // Customize
  secondaryColor = '#343a40'; // Customize
  headingFontSize = 44;
  labelFontSize = 44;
  useLightTheme = true; // Set initial theme


  constructor(private loginService:LoginService,private router: Router,private fb: FormBuilder) { }
  ngOnInit() {

    setTimeout(() => {
      this.containerClass = 'sign-in';
    }, 200);


    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  get f() {
    return this.loginForm.controls;
  }
  toggleForm(): void {
    // Toggle between 'sign-in' and 'sign-up'
    this.containerClass = this.containerClass === 'sign-in' ? 'sign-up' : 'sign-in';
  }

  onLoggedIn() {   
    if(this.loginForm.valid){
       this.loginService
         .adminLogin(this.loginForm.value)
         .subscribe((result) => {
           if (result.msg === "Authorized") {
            sessionStorage.setItem('msg', 'Authorized');
             this.router.navigate(["home/dashboard"]);
           } else {
             this.loginFailed=true;
             this.username_msg = "Invalid User Name";
             this.submitted= true
           }
         });}
        else{
         this.submitted= true
        } 
     }

}
