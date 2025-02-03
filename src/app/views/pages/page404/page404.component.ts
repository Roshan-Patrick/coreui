import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NurseRegService } from '../service/nurse-reg.service';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component {

  bookingForm: any;

  constructor(private fb: FormBuilder,private nurseService:NurseRegService, private router: Router) {}
  @HostListener('window:scroll', ['$event'])

  ngOnInit(): void {
    if(!this.bookingForm){
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      nurseType: ['', Validators.required],
      location: ['', Validators.required],
      services: ['', Validators.required],
      preferences: ['', Validators.required],
      agreement: [false, Validators.requiredTrue]
    });}
  //   var st = window.pageYOffset;
  //   // console.log(st);
  //   var navbar = document.getElementsByTagName('nav')[0];

  // //  console.log(navbar);
  //  if(st > 95){
  //   navbar.classList.add('header-pinned')
  //  }else{
  //   navbar.classList.remove('header-pinned');
  //  }
  // }
  }
  onSubmit(): void {
    if (this.bookingForm.valid) {
      // Create a copy of the form value, excluding the `agreement` field
      const formData = { ...this.bookingForm.value };
      delete formData.agreement;

      const enqData = this.getServiceAbbreviation(formData.services)
      const enquiryNumber = `${enqData}-${Date.now()}`;
      formData.enquiryno = enquiryNumber;
  
      console.log(formData);
      this.nurseService
        .nurseRegistration(formData) // Use the modified data
        .subscribe({
          next: (res) => {
            console.log('Success:', res);
            const modal = document.getElementById('successModal');
            if (modal) modal.classList.add('active');
            this.bookingForm.reset();
          },
          error: (err) => console.error('Error:', err),
        });
    }
  }

  redirectToNurse() {
    this.router.navigate(['/page/nurse']); 
  
    }

    get f(){
      return this.bookingForm.controls;
    }

    getServiceAbbreviation(service: string) {
      const abbreviations: Record<string, string> = {
          "Elder Care": "ED",
          "Bedridden Patient Care": "BP",
          "Stroke Patient Care": "SP",
          "Tracheostomy Patient Care": "TP",
          "Post Operative Care": "PO",
          "ICU Setup at Home": "ICU",
          "Physiotherapy at Home": "PH",
          "Travel Nurse": "TN",
          "Doctor's Visit at Home": "DV"
      };
  
      return abbreviations[service] || "UN"; 
    }

}


