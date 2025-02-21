import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}
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
