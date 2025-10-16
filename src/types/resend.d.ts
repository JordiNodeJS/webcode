// Types for Resend email service
export interface ContactEmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
}

export interface EmailResponse {
  success: boolean;
  id?: string;
  error?: string;
}
