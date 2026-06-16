import { Component } from '@angular/core';
import { Hero } from '../../component/hero/hero';
import { PopularPackages } from '../../component/popular-packages/popular-packages';
import { Testimonials } from '../../component/testimonials/testimonials';
import { WhyChooseUs } from '../../component/why-choose-us/why-choose-us';
import { Cta } from '../../component/cta/cta';
import { Contact } from '../contact/contact';
import { Services } from '../../component/services/services';

@Component({
  selector: 'app-home',
  imports: [Contact,Hero,Services,PopularPackages,Testimonials,WhyChooseUs,Cta],   
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
