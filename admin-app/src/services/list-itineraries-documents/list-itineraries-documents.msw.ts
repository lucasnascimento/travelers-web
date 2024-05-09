// eslint-disable-next-line import/no-extraneous-dependencies
import { HttpResponse, http } from 'msw'

import { variables } from '../../config'

const listItinerariesDocumentsData = {
  data: [
    {
      description: 'Imprimir e entregar assinado',
      document: {
        file_name: 'fc475c54-d5db-11ee-b2b1-23a30032b44b__Seguro_Affinity_Nacional.pdf',
        id: 'fc475c54-d5db-11ee-b2b1-23a30032b44b',
        mime: 'image/png',
        path: 'https://prd-uploads-bucket.s3.amazonaws.com/uploads/fc475c54-d5db-11ee-b2b1-23a30032b44b__Seguro_Affinity_Nacional.pdf?AWSAccessKeyId=aws_access_key&Signature=CxI%2BTrL0OwSBOufZXdfAS8RjbaU%3D&Expires=1714681590',
        size_bytes: 0,
      },
      document_id: 'fc475c54-d5db-11ee-b2b1-23a30032b44b',
      id: 'e2b8b81c-d5dd-11ee-9903-6b07280aa1ff',
      inserted_at: 'Tue, 27 Feb 2024 23:02:20 GMT',
      is_deleted: false,
      itinerary_id: '05776c7e-cf6a-11ee-9bc7-cf9d8d8e9d04',
      link: '',
      position: 4,
      title: 'Seguro Viagem',
      updated_at: 'Tue, 27 Feb 2024 23:02:20 GMT',
    },
    {
      description: 'Imprimir e entregar assinado',
      document: {
        file_name: 'e2a1b824-d03d-11ee-80e0-5f53a620f6dc__Autorizacao_Viagem_Nacional_menores16anos.pdf',
        id: 'e2a1b824-d03d-11ee-80e0-5f53a620f6dc',
        mime: 'application/pdf\n',
        path: 'https://prd-uploads-bucket.s3.amazonaws.com/uploads/e2a1b824-d03d-11ee-80e0-5f53a620f6dc__Autorizacao_Viagem_Nacional_menores16anos.pdf?AWSAccessKeyId=aws_access_key&Signature=VtLubvv5YCwIo%2F%2B6FqoBy1Aou2M%3D&Expires=1714681590',
        size_bytes: 0,
      },
      document_id: 'e2a1b824-d03d-11ee-80e0-5f53a620f6dc',
      id: '413aa262-cff1-11ee-98c6-1772e2973ac4',
      inserted_at: 'Mon, 15 Jan 2024 23:24:41 GMT',
      is_deleted: false,
      itinerary_id: '05776c7e-cf6a-11ee-9bc7-cf9d8d8e9d04',
      link: 'https://docs.google.com/document/d/1U-LBsLfGAQwLpohdlodQ9gOxrnX957V-/edit?usp=drive_link&ouid=114023027847434860130&rtpof=true&sd=true',
      position: 0,
      title: 'Autorização de Viagem Nacional',
      updated_at: 'Mon, 15 Jan 2024 23:24:41 GMT',
    },
  ],
}

export const listItinerariesDocuments = http.get(
  `${variables.API_BASE_URL}api/admin/itinerary/:id/document`,
  () => HttpResponse.json({
    status: 200,
    ...listItinerariesDocumentsData,
  })
)
