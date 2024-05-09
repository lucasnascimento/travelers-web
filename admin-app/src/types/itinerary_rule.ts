export type ListItineraryRuleResponse = {
  data: {
    id: string
    inserted_at: string
    installments: number
    is_deleted: boolean
    itinerary_id: string
    montly_interest: string
    pix_discount: string
    position: number
    purchase_deadline: string
    seat_price: string
    updated_at: string
  }[]
}
