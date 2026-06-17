import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

// import 
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

  // ✅ Toast
  showToast: boolean = false;
  toastMessage: string = '';

  // ✅ Min date
  todayDate = '';

  constructor(
    private fb: FormBuilder,
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {

    this.todayDate = new Date().toISOString().split('T')[0];

    // ================= SEO (ADD THIS) =================
    this.title.setTitle('Contact Famigo Holidays | Book Travel Packages');

    this.meta.updateTag(
      {
        name: 'description',
        content: 'Contact Famigo Holidays for booking domestic and international tour packages. Get quick travel assistance.'
      },
      'name="description"'
    );

    this.meta.updateTag({
      name: 'keywords',
      content: 'contact travel agency, book tour packages, famigo holidays contact, travel enquiry india'
    });
    // ===================================================

    // ✅ Form init
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      countryCode: ['+91', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      destination: ['', Validators.required],
      travelers: [''],
      hotel: [''],
      date: [''],
      message: ['']
    });


    // ✅ Load saved data (Browser only)
    if (isPlatformBrowser(this.platformId)) {


      const savedData = localStorage.getItem('enquiryForm');

      if (savedData) {
        this.enquiryForm.patchValue(JSON.parse(savedData));
      }

      this.enquiryForm.valueChanges.subscribe(value => {
        localStorage.setItem('enquiryForm', JSON.stringify(value));
      });
    }

  }
  /* ✅ Only numbers allowed */
  onPhoneInput(event: any): void {

    const input = event.target.value;

    const cleanedValue = input.replace(/[^0-9]/g, '');

    if (input !== cleanedValue) {
      this.enquiryForm
        .get('phone')
        ?.setValue(cleanedValue, { emitEvent: false });
    }

  }
  /* ✅ Country Codes */
  countryCodes = [
    { code: '+91', country: 'India 🇮🇳' },
    { code: '+1', country: 'USA 🇺🇸' },
    { code: '+44', country: 'UK 🇬🇧' },
    { code: '+971', country: 'UAE 🇦🇪' },
    { code: '+61', country: 'Australia 🇦🇺' }
  ];

  /* ✅ Submit */
  submitForm(): void {

    if (this.enquiryForm.invalid) {

      this.enquiryForm.markAllAsTouched();

      this.showToastMessage(
        '⚠️ Please fill all required details correctly'
      );

      return;
    }

    this.loading = true; const form = this.enquiryForm.value; const fullPhone = `${form.countryCode} ${form.phone}`; const formattedDate = form.date ? new Date(form.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not specified'; let userMessage = 'I am interested in this travel plan. Kindly share the complete details and assist me further.'; if (form.message && form.message.trim() !== '') { userMessage = form.message.trim(); } const message = `🌍 *New Travel Enquiry*
👤 Name: ${form.name || ''}
📞 Phone: ${fullPhone || ''}
📧 Email: ${form.email || ''}
📍 Destination: ${form.destination || ''}
👥 Travelers: ${form.travelers || 'Not specified'}
🏨 Hotel Preference: ${form.hotel || 'Not specified'}
📅 Travel Date: ${formattedDate}

📝 Message:
${userMessage}`;

    const whatsappNumber = '918077235910';

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {

      if (isPlatformBrowser(this.platformId)) {
        window.open(whatsappUrl, '_blank');
      }

      this.loading = false;

      this.showToastMessage('✅ Inquiry sent successfully!');

      this.enquiryForm.reset({
        countryCode: '+91'
      });
      // ✅ Clear saved data (Browser only)
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('enquiryForm');
      }

      this.enquiryForm.markAsPristine();
      this.enquiryForm.markAsUntouched();

    }, 800);

  }


  /* ✅ Toast */
  showToastMessage(msg: string): void {

    this.toastMessage = msg;

    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);

  }

}
