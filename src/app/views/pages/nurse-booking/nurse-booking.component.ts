import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FootersComponent } from "../footer/footer.component";
import { Router } from '@angular/router';
import { NurseRegService } from '../service/nurse-reg.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-nurse-booking',
  standalone: true,
  imports: [HeaderComponent, FootersComponent,FormsModule,CommonModule],
  templateUrl: './nurse-booking.component.html',
  styleUrl: './nurse-booking.component.scss'
})
export class NurseBookingComponent {
  @ViewChildren('bookbtn') bookButton!: QueryList<ElementRef> ; 

  users: any[] = [];
  filteredNurses: any[] = [];
  searchText: string = '';

  constructor(private renderer:Renderer2,private router: Router,private nurseService:NurseRegService){}

  ngOnInit() {
    this.getAllApproved();
  }

  // ngAfterViewInit(): void {
  //   console.log(this.bookButton)
  //   if (this.bookButton) {
  //     this.bookButton.forEach((buttons,index)=>{
  //       this.renderer.listen(buttons.nativeElement, "click", () => {
  //         alert("Your request has been forwarded to BookMyNurse team. Our team will get back to you.");
  //         this.router.navigate(['/index']); 
  //       });
  //     })
      
     
  //   }

  //   setTimeout(() => {
  //     $('.doctor-slider').slick({
  //       slidesToShow: 3,
  //       slidesToScroll: 1,
  //       arrows: true,
  //       dots: false,
  //       autoplay: true,
  //       autoplaySpeed: 2000,
  //       prevArrow: '<button type="button" class="slick-prev">Previous</button>',
  //       nextArrow: '<button type="button" class="slick-next">Next</button>',
  //     });
  //   }, 500);
  // }

  // ngOnDestroy() {
  //   $('.doctor-slider').slick('unslick'); // Destroy slider when component is removed
  // }


  getAllApproved() {
    this.nurseService.nurseRegistered('Approved').subscribe((res: any) => {
      console.log(res);
      this.users = res.data.map((user: any) => ({
        ...user,
        photoUrl: `http://localhost:3000/${user.file_path}`,
        languages: Array.isArray(user.languages) ? user.languages : [],
        serviceopt: Array.isArray(user.serviceopt) ? user.serviceopt : [],
        from_time: user.from_time || 'N/A',
        to_time: user.to_time || 'N/A',
      }));
      this.filteredNurses = [...this.users]; // Set initial data
    });
  }

  // Age Calculation from DOB
  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  // Search Function
  onSearchInput() {
    this.filteredNurses = this.users.filter(nurse => {
      return (
        nurse.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        nurse.specialization.toLowerCase().includes(this.searchText.toLowerCase()) ||
        nurse.address.toLowerCase().includes(this.searchText.toLowerCase()) ||
        nurse.education.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });
  }




  }


