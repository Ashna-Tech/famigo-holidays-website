import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Packages } from '../../pages/packages/packages';

@Component({
  selector: 'app-hero',
  imports: [RouterLink,RouterModule,Packages,],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {

}
