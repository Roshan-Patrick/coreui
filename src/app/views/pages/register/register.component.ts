import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NurseRegService } from '../service/nurse-reg.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  nurseRegistrationForm: FormGroup | any;
  photoFileValid = false;
  uploadedFile: File | null = null;
  maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
  imageValidationError = '';
  constructor(private fb: FormBuilder,private nurseService:NurseRegService) {}

  ngOnInit() {
    this.nurseRegistrationForm = this.fb.group({
      name: ['', Validators.required],
      aadhaar: [ '',[Validators.required,Validators.minLength(10),Validators.maxLength(12),Validators.pattern('^[0-9]*$'),],],
      mobile: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]*$'),],],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      education: ['', Validators.required],
      experience: ['',[Validators.required,Validators.pattern('^[0-9]*$'),Validators.maxLength(2),],],
      languages: ['', Validators.required],
      specialization: ['', Validators.required],
      address: ['', Validators.required],
      'base_location': ['', Validators.required],
      photo: ['', Validators.required],
      declaration: [false, Validators.requiredTrue], // Checkbox validation
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const validExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (!validExtensions.includes(fileExtension ?? '')) {
        this.imageValidationError = 'Only JPG, JPEG, and PNG files are allowed.';
        this.photoFileValid = false;
      } else if (file.size > this.maxFileSize) {
        this.imageValidationError = 'File size must not exceed 2MB.';
        this.photoFileValid = false;
      } else {
        this.uploadedFile = file;
        this.photoFileValid = true;
        this.imageValidationError = '';
      }
    } else {
      this.photoFileValid = false;
      this.imageValidationError = 'Please upload an image.';
    }
  }

  // onSubmit() {
  //   if (this.nurseRegistrationForm.valid && this.photoFileValid) {

  //     const formData = new FormData();

  //     // Append form values except 'agreement'
  //     Object.entries(this.nurseRegistrationForm.value).forEach(([key, value]) => {
  //       if (key !== 'declaration' && key!=='photo') {
  //         // Ensure all values are strings before appending
  //         if (typeof value === 'object' && value !== null) {
  //           formData.append(key, JSON.stringify(value)); // Convert objects to string
  //         } else if (value !== null && value !== undefined) {
  //           formData.append(key, value.toString()); // Convert numbers and booleans to strings
  //         }
  //       }
  //     });
      
  //     // Append file separately
  //     if (this.uploadedFile) {
  //       formData.append('photo', this.uploadedFile);
  //     }
      
  //     // ✅ Check FormData contents
  //     formData.forEach((value, key) => {
  //       console.log(`${key}:`, value);
  //     });
      

  //     this.nurseService.nurseRegistrationDetails(formData).subscribe(
  //       (response) => {
  //         console.log('Registration Successful:', response);
  //       },
  //       (error) => {
  //         console.error('Registration Error:', error);
  //       }
  //     );
      


  //   }
  // }

  onSubmit() {
    if (this.nurseRegistrationForm.valid && this.photoFileValid) {
      const formData = new FormData();
  
      Object.entries(this.nurseRegistrationForm.value).forEach(([key, value]) => {
        if (key !== 'declaration' && key !== 'photo') {
          formData.append(key, value as string); // Convert to string only if needed
        }
      });
  
      // Append image separately
      if (this.uploadedFile) {
        formData.append('photo', this.uploadedFile);
      }

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });
      
  
      this.nurseService.nurseRegistrationDetails(formData).subscribe(
        (response) => {
          console.log('Registration Successful:', response);
        },
        (error) => {
          console.error('Registration Error:', error);
        }
      );
    }
  }
  
}
