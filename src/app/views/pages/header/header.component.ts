import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router,private renderer: Renderer2) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.closeMenu();
    //   }
    // });
  }
  
  isMenuOpen = false;

  

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen)
  
    if (this.isMenuOpen) {
      this.renderer.addClass(document.documentElement, 'menu-opened');
    } else {
      this.renderer.removeClass(document.documentElement, 'menu-opened');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.renderer.removeClass(document.documentElement, 'menu-opened');
  }

  
  
  closePopup() {
  const modal = document.getElementById('successModal');
  if (modal) modal.classList.remove('active');
}


  showPopup(){
    // console.log("Hello")
    const modal = document.getElementById('successModal');
    if (modal) modal.classList.add('active');
  }

  navigateToSection(sectionId: string) {
    this.router.navigate(['/pages'], { fragment: sectionId });
  }
}
