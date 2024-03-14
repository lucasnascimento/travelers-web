export type FormData = {
  payer_document: string;
  payer_email: string;
  payer_name: string;
  payer_phone: string;
  travelers: {
    traveler_birthdate: string;
    traveler_document_type?: string;
    traveler_extras: {
      'document-date'?: string;
      'document-issuer'?: string;
      'document-number'?: string;
      'document-number-rg'?: string;
      'document-number-cpf'?: string;
      'document-number-rne'?: string;
      'room-grade': string;
    };
    traveler_gender: 'Male' | 'Female';
    traveler_name: string;
  }[];
}
