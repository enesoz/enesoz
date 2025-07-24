import { Component, Input } from '@angular/core';
import { Contact, WebProfile } from '../../models/PersonalInfoInterfaces';
import { TranslatePipe } from '../../../services/translate_pipe';
import { NgForOf } from '@angular/common';

/**
 * Contact Info component that displays contact information and web profiles
 */
@Component({
  selector: 'app-contact-info',
  templateUrl: 'contact-info-component.html',
  imports: [
    TranslatePipe,
    NgForOf
  ],
  styleUrls: ['contact-info-component.css']
})
export class ContactInfoComponent {
  @Input() contact!: Contact;
  @Input() webProfiles!: WebProfile[];
}
