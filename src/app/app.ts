import { Component, signal } from '@angular/core';
import { NavigationEnd, Route, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Packages } from './pages/packages/packages';
import { Navbar } from './component/layout/navbar/navbar';
import { Footer } from './component/layout/footer/footer';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar,RouterOutlet,CommonModule,FormsModule,Packages,Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  isHomePage = false;

  constructor(private router: Router){
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {

      this.isHomePage = event.url === '/';
    });
  }
  protected readonly title = signal('famigo-holidays');
}
