export interface ContactInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  priority?: 'normal' | 'urgent' | 'telemetry';
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(input: Partial<ContactInput>): ValidationResult {
  const errors: Record<string, string> = {};

  const name = (input.name || '').trim();
  if (!name) {
    errors.name = 'Transmitter Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Transmitter Name must be at least 2 characters.';
  } else if (name.length > 80) {
    errors.name = 'Transmitter Name exceeds 80 characters limit.';
  }

  const email = (input.email || '').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.email = 'Return Protocol (Email) is required.';
  } else if (!emailRegex.test(email)) {
    errors.email = 'Invalid transmission address format (e.g. operator@domain.com).';
  }

  const subject = (input.subject || '').trim();
  if (!subject) {
    errors.subject = 'Packet Subject is required.';
  } else if (subject.length < 3) {
    errors.subject = 'Packet Subject must be at least 3 characters.';
  } else if (subject.length > 120) {
    errors.subject = 'Packet Subject exceeds 120 characters limit.';
  }

  const message = (input.message || '').trim();
  if (!message) {
    errors.message = 'Payload Data (Message) cannot be empty.';
  } else if (message.length < 10) {
    errors.message = 'Payload Data must be at least 10 characters for transmission.';
  } else if (message.length > 3000) {
    errors.message = 'Payload Data exceeds 3000 character limit.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function generateTransmissionId(): string {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).toUpperCase().padStart(6, '0');
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  return `TX-${hex}-${timestamp}`;
}
