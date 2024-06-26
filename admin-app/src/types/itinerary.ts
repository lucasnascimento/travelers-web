type Itinerary = {
  boarding_date: string
  cancelation_rules: string
  cover: {
    file_name: string
    id: string
    mime: string
    path: string
    size_bytes: number
  }
  cover_id: string
  cover_small: {
    file_name: string
    id: string
    mime: string
    path: string
    size_bytes: number
  }
  cover_small_id: string
  current_step: string
  details: string
  group: {
    description: string
    id: string
    inserted_at: string
    is_deleted: boolean
    updated_at: string
  }
  group_id: string
  id: string
  inserted_at: string
  installments: number
  institution: {
    active_on_website: boolean
    banking_account: {
      account_number: string
      bank_agency: string
      bank_code: string
    }
    document: string
    file: {
      file_name: string
      id: string
      mime: string
      path: string
      size_bytes: number
    }
    file_id: string
    has_banking_account: boolean
    id: string
    inserted_at: string
    is_deleted: boolean
    name: string
    ranking: string
    updated_at: string
  }
  institution_id: string
  is_deleted: boolean
  landing_date: string
  pix_discount: string
  purchase_deadline: string
  seat_price: string
  seats: number
  services: string
  sold_seats: number
  status: string
  summary: string
  terms_and_conditions: string
  title: string
  updated_at: string
}

export type ListItinerariesResponse = {
  data: Itinerary[]
}

export type UpdateItinerariesRequest = {
  is_deleted?: boolean
  status?: 'booking_closed' | 'booking_opened' | 'sold_out'
  title?: string
  boarding_date?: string
  landing_date?: string
  seats?: number
  purchase_deadline?: string
  details?: string
  summary?: string
  services?: string
  terms_and_conditions?: string
}

export type UpdateItinerariesResponse = {
  data: Itinerary
}

export type GetItineraryResponse = {
  data: Itinerary
}

export type CreateItinerariesRequest = {
  institution_id: string
  title: string
  boarding_date: string
  landing_date: string
  seats: number
  sold_seats: number
  purchase_deadline: string
  installments: number
  details: string
  summary: string
  services: string
  terms_and_conditions: string
}

export type CreateItinerariesResponse = {
  data: Itinerary
}
