type TravelerExtras = {
  'room-grade': string;
  'document-type': string;
  documents: {
    rg?: string;
    rne?: string;
    cpf: string;
  }
  'document-date': string;
  'document-issuer': string;
}

type Traveler = {
  traveler_name: string;
  traveler_birthdate: string;
  traveler_gender: 'Male' | 'Female';
  traveler_extras: TravelerExtras;
}

export type BookingItinerariesRequest = {
  payer_name: string;
  payer_email: string;
  payer_phone: string;
  payer_document: string;
  payment_method: string;
  travelers: Traveler[];
}

export type BookingItinerariesResponse = {
  data: {
    booking_id: string
    invoice_url: string
  }
}
