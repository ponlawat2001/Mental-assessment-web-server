export interface ContactModel {
  message: string;
  result: ContactResult[];
}

export interface ContactResult {
  id: string;
  name_contact: string;
  image_contact: string;
  location_contact: string;
  email_contact: string;
  facebook_contact: string;
  line_contact: string;
  phone_contact: string;
  update_at: UpdateAt;
}

export interface UpdateAt {
  _seconds: number;
  _nanoseconds: number;
}
