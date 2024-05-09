export type ListItineraryEntryResponse = {
  data: {
    description: string
    id: string
    inserted_at: string
    is_deleted: boolean
    itinerary_id: string
    position: number
    title: string
    updated_at: string
  }[]
}

export type CreateItinerariesEntriesRequest = {
  title: string
  description: string
}

export type CreateItinerariesEntriesResponse = {
  data: {
    description: string
    id: string
    inserted_at: string
    is_deleted: boolean
    itinerary_id: string
    position: number
    title: string
    updated_at: string
  }
}
