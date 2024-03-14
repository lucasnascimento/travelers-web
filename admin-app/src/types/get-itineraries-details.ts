export type GetItinerariesDetailsResponse = {
  data: {
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
    current_step: string
    details: string
    documents: {
      description: string
      document_id: string | null
      id: string
      inserted_at: string
      is_deleted: boolean
      itinerary_id: string
      link: string
      position: number
      title: string
      updated_at: string
      document: {
        file_name: string
        id: string
        mime: string
        path: string
      }
    }[]
    entries: {
      description: string
      id: string
      position: number
      title: string
    }[]
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
      updated_at: string
    }
    institution_id: string
    is_deleted: boolean
    landing_date: string
    photos: {
      description: string
      id: string
      inserted_at: string
      is_deleted: boolean
      itinerary_id: string
      photo: {
        file_name: string
        id: string
        mime: string
        path: string
        size_bytes: number
      }
      photo_id: string
      position: number
      title: string
      updated_at: string
    }[]
    purchase_deadline: string
    rules: {
      id: string
      installments: number
      position: number
      purchase_deadline: string
    }[]
    seat_price: string
    seats: number
    sold_seats: number
    services: string
    status: string
    summary: string
    terms_and_conditions: string
    title: string
    updated_at: string
  }
}
