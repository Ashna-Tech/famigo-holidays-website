import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
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
  todayDate = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

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

    // ✅ Load saved data
    const savedData = localStorage.getItem('enquiryForm');
    if (savedData) {
      this.enquiryForm.patchValue(JSON.parse(savedData));
    }

    // ✅ Auto save
    this.enquiryForm.valueChanges.subscribe(value => {
      localStorage.setItem('enquiryForm', JSON.stringify(value));
    });
  }

  /* ✅ Only numbers allowed */
  onPhoneInput(event: any): void {
    const input = event.target.value;
    const cleanedValue = input.replace(/[^0-9]/g, '');

    if (input !== cleanedValue) {
      this.enquiryForm.get('phone')?.setValue(cleanedValue, { emitEvent: false });
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
      this.showToastMessage('⚠️ Please fill all required details correctly');
      return;
    }

    this.loading = true;

    const form = this.enquiryForm.value;

    const fullPhone = `${form.countryCode} ${form.phone}`;

    const formattedDate = form.date
      ? new Date(form.date).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : 'Not specified';

    // ✅ SMART MESSAGE (fallback)
    let userMessage = 'I am interested in this travel plan. Kindly share the complete details and assist me further.';

    if (form.message && form.message.trim() !== '') {
      userMessage = form.message.trim();
    }

    // ✅ Final WhatsApp message
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

    const whatsappNumber = '918755586891';

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setTimeout(() => {

      window.open(whatsappUrl, '_blank');

      this.loading = false;

      this.showToastMessage('✅ Inquiry sent successfully!');

      // ✅ Reset form
      this.enquiryForm.reset({
        countryCode: '+91'
      });

      // ✅ Clear saved data
      localStorage.removeItem('enquiryForm');

      // ✅ Reset validation state
      this.enquiryForm.markAsPristine();
      this.enquiryForm.markAsUntouched();

    }, 800);
  }

  /* ✅ Toast */
  showToastMessage(msg: string) {
    this.toastMessage = msg;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

}
