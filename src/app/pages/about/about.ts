import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {

    // ================= SEO (ADD THIS) =================
    this.title.setTitle('About Famigo Holidays | Trusted Travel Company');

    this.meta.updateTag(
      {
        name: 'description',
        content: 'Learn about Famigo Holidays - a trusted travel agency offering domestic and international tour packages at best prices.'
      },
      'name="description"'
    );

    this.meta.updateTag({
      name: 'keywords',
      content: 'about famigo holidays, travel company india, tour agency, holiday packages provider'
    });
    // ===================================================
  }

}
