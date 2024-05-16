export type ListItineraryDocumentResponse = {
  data: {
    description: string
    document?: {
      file_name: string
      id: string
      mime: string
      path: string
      size_bytes: number
    }
    document_id: string
    id: string
    inserted_at: string
    is_deleted: boolean
    itinerary_id: string
    link: string
    position: number
    title: string
    updated_at: string
  }[]
}

export type CreateItinerariesDocumentsRequest = {
  title: string
  description?: string
  link?: string
}

export type CreateItinerariesDocumentsResponse = {
  data: {
    description: string
    document_id: string
    id: string
    inserted_at: string
    is_deleted: boolean
    itinerary_id: string
    link: string
    position: number
    title: string
    updated_at: string
  }
}

export type UploadItinerariesDocumentsRequest = {
  file: File
}
