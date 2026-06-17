import { Component } from '@angular/core';
import { Hero } from '../../component/hero/hero';
import { PopularPackages } from '../../component/popular-packages/popular-packages';
import { Testimonials } from '../../component/testimonials/testimonials';
import { WhyChooseUs } from '../../component/why-choose-us/why-choose-us';
import { Cta } from '../../component/cta/cta';
import { Contact } from '../contact/contact';
import { Services } from '../../component/services/services';
import { Title, Meta } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  imports: [Contact,Hero,Services,PopularPackages,Testimonials,WhyChooseUs,Cta],   
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

  constructor(private title: Title, private meta: Meta) {}

ngOnInit() {
  this.title.setTitle('Famigo Holidays | Best Travel Packages in India');

  this.meta.updateTag({
    name: 'description',
    content: 'Explore religious, honeymoon, domestic and international tour packages with Famigo Holidays.'
  });

}
}
