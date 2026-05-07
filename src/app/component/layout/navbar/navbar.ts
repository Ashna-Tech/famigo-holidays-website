import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { Packages } from '../../../pages/packages/packages';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,RouterLinkActive,RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

isMenuOpen = false;
isDropdownOpen = false;

constructor(private router:Router){}

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
}

closeMenu() {
  this.isMenuOpen = false;
  this.isDropdownOpen = false;
}

//////////////////////////////////////////////////////
// ✅ NEW FUNCTION (IMPORTANT)
//////////////////////////////////////////////////////

handleCallClick(): void {

   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
    // 📱 Mobile → direct call
    window.location.href = 'tel:+918077235910';
  } else {
    // 💻 Desktop → contact page
    this.router.navigate(['/contact']);
  }

   // menu close (important for mobile UX)
  this.closeMenu();
}
}
