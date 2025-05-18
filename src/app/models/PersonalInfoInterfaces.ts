export interface Language {
  name: string;
  level: string;
}

export interface WebProfile {
  name: string;
  url: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface About {
  languages: Language[];
  experience: string;
  militaryObligation: string;
}

export interface PersonalInfo {
  name: string;
  surname: string;
  location: string;
  titles: string[];
  contact: Contact;
  webProfiles: WebProfile[];
  about: About;
}