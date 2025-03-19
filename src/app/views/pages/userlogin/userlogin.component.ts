import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginService } from '../service/login.service';
import { CommonModule } from '@angular/common';
import { FootersComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CardModule, ButtonModule, GridModule, FormModule, ButtonGroupModule, UtilitiesModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userlogin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule,FootersComponent,HeaderComponent,CardModule,ButtonModule,GridModule,IconModule,
      FormModule,
      ButtonGroupModule,
      UtilitiesModule,],
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.scss'
})
export class UserloginComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  isLogin = true;
  submitted = false;
  loginFailed = false;
  username_msg = '';
  pwd_msg = '';

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Fix: Added email validator
      password: ['', [Validators.required, Validators.minLength(6)]] // Fix: Validators should be inside an array
    });

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; } // Correct form controls for login
  get r() { return this.registerForm.controls; } // Correct form controls for register

  onLoggedIn() {
    this.submitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService.clientLogin(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log("Success Response:", data);

        if (data.message === 'Invalid email') {
          this.loginFailed = true;
          this.username_msg = "Invalid Email";
          this.toastr.error("Invalid Email");
        } else if (data.message === 'Invalid password') {
          this.loginFailed = true;
          this.pwd_msg = "Invalid Password"; // Fix: Corrected variable usage
          this.toastr.error("Invalid Password");
        } else if (data.message === "Login successful") {
          sessionStorage.setItem("LoggedInUser", JSON.stringify(data));
          this.toastr.success("Login successfully");
          this.router.navigate(['/index']);
        }
      },
      error: (error) => {
        console.error("Login Error:", error);
        this.pwd_msg = "Network Error";
        this.toastr.error("Network Error");
      }
    });
  }

  onRegister() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
      return;
    }

    this.loginService.clientRegistration(this.registerForm.value).subscribe({
      next: (data: any) => {
        console.log("Registration Success:", data);

        if (data.message === "Email already exists") {
          this.loginFailed = true;
          this.username_msg = "Email already exists";
          this.toastr.warning("Email already exists");
        } else if (data.message === "User registered successfully") {
          this.toastr.success("Registered successfully");
          this.loginForm.reset(
            {email:'',
            password:'' }
          );
          this.submitted=false
          this.isLogin = true; // Fix: Switch back to login on successful registration
          // this.toggleForm();

        }
      },
      error: (error) => {
        console.error("Registration Error:", error);
        this.pwd_msg = "Network Error";
        this.toastr.error("Network Error");
      }
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.submitted = false;
    this.username_msg = '';
    this.pwd_msg = '';
    console.log(this.isLogin)

    // Reset form values and validation errors
    if (this.isLogin) {
      this.loginForm.reset(
        {email:'',
          password:'' }
      );
    } else {
      this.registerForm.reset();
    }
  }
}

