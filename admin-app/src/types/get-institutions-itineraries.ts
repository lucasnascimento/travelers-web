type BankingAccount = {
  account_number: string
  bank_agency: string
  bank_code: string
}

type File = {
  file_name: string
  id: string
  mime: string
  path: string
  size_bytes: number
}

type Institution = {
  active_on_website: boolean
  banking_account: BankingAccount
  document: string
  file: File
  file_id: string
  has_banking_account: boolean
  id: string
  inserted_at: string
  is_deleted: boolean
  name: string
  updated_at: string
}

type Group = {
  id: string
  description: string
  inserted_at: string
  is_deleted: boolean
  updated_at: string
}

type Cover = {
  file_name: string
  id: string
  mime: string
  path: string
  size_bytes: number
}

type Data = {
  boarding_date: string
  cover_id: null
  cover: Cover
  cover_small: Cover
  current_step: string
  details: string
  group: Group
  group_id: null
  id: string
  inserted_at: string
  installments: number
  institution: Institution
  institution_id: string
  is_deleted: boolean
  landing_date: string
  purchase_deadline: string
  seat_price: string
  seats: number
  services: string
  status: string
  summary: string
  terms_and_conditions: string
  title: string
  updated_at: string
}

export type GetInstitutionsItinerariesResponse = {
  data?: Data[]
}
