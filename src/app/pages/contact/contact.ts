import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {

  enquiryForm!: FormGroup;

  loading: boolean = false;

  // ================= TOAST =================

  showToast: boolean = false;
  toastMessage: string = '';

  // ================= MIN DATE =================

  todayDate = '';

  // ================= CONSTRUCTOR =================

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // ================= INIT =================

  ngOnInit(): void {

    // Today's date
    this.todayDate = new Date().toISOString().split('T')[0];

    // ================= SEO =================

    if (this.route.snapshot.routeConfig?.path === 'contact') {

      this.title.setTitle(
        'Contact Famigo Holidays | Book Travel Packages'
      );

      this.meta.updateTag({
        name: 'description',
        content:
          'Contact Famigo Holidays for domestic and international tour packages, religious tours, honeymoon packages, hotel bookings and travel assistance.'
      });

      this.meta.updateTag({
        name: 'robots',
        content: 'index, follow'
      });

      // ================= CANONICAL =================

      const canonicalUrl =
        'https://famigoholidays.com/contact';

      let canonicalLink =
        this.document.querySelector(
          'link[rel="canonical"]'
        ) as HTMLLinkElement | null;

      if (!canonicalLink) {

        canonicalLink =
          this.document.createElement('link');

        canonicalLink.setAttribute(
          'rel',
          'canonical'
        );

        this.document.head.appendChild(
          canonicalLink
        );
      }

      canonicalLink.setAttribute(
        'href',
        canonicalUrl
      );
    }

    // ================= FORM INIT =================

    this.enquiryForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      countryCode: [
        '+91',
        Validators.required
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      destination: [
        '',
        Validators.required
      ],

      travelers: [
        ''
      ],

      hotel: [
        ''
      ],

      date: [
        ''
      ],

      message: [
        ''
      ]

    });

    // ================= LOAD SAVED DATA =================

    if (isPlatformBrowser(this.platformId)) {

      const savedData =
        localStorage.getItem('enquiryForm');

      if (savedData) {

        try {

          this.enquiryForm.patchValue(
            JSON.parse(savedData)
          );

        } catch {

          localStorage.removeItem(
            'enquiryForm'
          );

        }

      }

      // Save form data
      this.enquiryForm.valueChanges.subscribe(value => {

        localStorage.setItem(
          'enquiryForm',
          JSON.stringify(value)
        );

      });

    }

    // ================= PACKAGE FROM URL =================

    this.route.queryParamMap.subscribe(params => {

      const packageSlug =
        params.get('package');

      if (packageSlug) {

        const destinationName =
          this.formatPackageName(packageSlug);

        this.enquiryForm.patchValue({
          destination: destinationName
        });

      }

    });

  }

  // ================= FORMAT PACKAGE NAME =================

  private formatPackageName(slug: string): string {

    return slug
      .split('-')
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(' ');

  }

  // ================= PHONE INPUT =================

  onPhoneInput(event: any): void {

    const input =
      event.target.value;

    const cleanedValue =
      input.replace(/[^0-9]/g, '');

    if (input !== cleanedValue) {

      this.enquiryForm
        .get('phone')
        ?.setValue(
          cleanedValue,
          {
            emitEvent: false
          }
        );

    }

  }

  // ================= COUNTRY CODES =================

  countryCodes = [

    {
      code: '+91',
      country: 'India 🇮🇳'
    },

    {
      code: '+1',
      country: 'USA 🇺🇸'
    },

    {
      code: '+44',
      country: 'UK 🇬🇧'
    },

    {
      code: '+971',
      country: 'UAE 🇦🇪'
    },

    {
      code: '+61',
      country: 'Australia 🇦🇺'
    }

  ];

  // ================= SUBMIT =================

  submitForm(): void {

    if (this.enquiryForm.invalid) {

      this.enquiryForm.markAllAsTouched();

      this.showToastMessage(
        '⚠️ Please fill all required details correctly'
      );

      return;

    }

    this.loading = true;

    const form =
      this.enquiryForm.value;

    const fullPhone =
      `${form.countryCode} ${form.phone}`;

    const formattedDate =
      form.date
        ? new Date(form.date).toLocaleDateString(
            'en-IN',
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }
          )
        : 'Not specified';

    let userMessage =
      'I am interested in this travel plan. Kindly share the complete details and assist me further.';

    if (
      form.message &&
      form.message.trim() !== ''
    ) {

      userMessage =
        form.message.trim();

    }

    const message = `🌍 *New Travel Enquiry*

👤 Name: ${form.name || ''}

📞 Phone: ${fullPhone || ''}

📧 Email: ${form.email || ''}

📍 Destination: ${form.destination || ''}

👥 Travelers: ${form.travelers || 'Not specified'}

🏨 Hotel Preference: ${form.hotel || 'Not specified'}

📅 Travel Date: ${formattedDate}

📝 Message:
${userMessage}`;

    const whatsappNumber =
      '918077235910';

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {

      if (
        isPlatformBrowser(
          this.platformId
        )
      ) {

        window.open(
          whatsappUrl,
          '_blank'
        );

      }

      this.loading = false;

      this.showToastMessage(
        '✅ Inquiry sent successfully!'
      );

      this.enquiryForm.reset({
        countryCode: '+91'
      });

      // Clear saved data

      if (
        isPlatformBrowser(
          this.platformId
        )
      ) {

        localStorage.removeItem(
          'enquiryForm'
        );

      }

      this.enquiryForm.markAsPristine();

      this.enquiryForm.markAsUntouched();

    }, 800);

  }

  // ================= TOAST =================

  showToastMessage(
    msg: string
  ): void {

    this.toastMessage =
      msg;

    this.showToast =
      true;

    setTimeout(() => {

      this.showToast =
        false;

    }, 3000);

  }

}