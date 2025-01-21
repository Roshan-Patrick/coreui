import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
buttonHover(arg0: string) {
throw new Error('Method not implemented.');
}
buttonLeave(arg0: string) {
throw new Error('Method not implemented.');
}
onSubmit() {
throw new Error('Method not implemented.');
}
  loginForm!: FormGroup;
  error$: Observable<string> | undefined;
  primaryColor = '#28a745'; // Customize
  secondaryColor = '#343a40'; // Customize
  headingFontSize = 44;
  labelFontSize = 44;
  useLightTheme = true; // Set initial theme
  fb: any;

  constructor() { }
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  // Initialize error observable
  }

}
