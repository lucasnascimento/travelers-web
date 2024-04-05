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

export type CreateInstitutionsRequest = {
  name: string
  document: string
  has_banking_account: boolean
  banking_account?: BankingAccount
  password: string
}

export type CreateInstitutionsResponse = {
  data: {
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
    ranking: string
    updated_at: string
  }
}

export type ListInstitutionsResponse = {
  data: {
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
    ranking: string
    updated_at: string
  }[]
}

export type UpdateInstitutionsRequest = {
  active_on_website?: boolean
}

export type UpdateInstitutionsResponse = {
  data: {
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
    ranking: string
    updated_at: string
  }
}
