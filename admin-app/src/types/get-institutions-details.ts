type FileType = {
  file_name: string
  id: string
  mime: string
  path: string
  size_bytes: number
}

type BankingAccount = {
  account_number: string
  bank_agency: string
  bank_code: string
}

type Institution = {
  active_on_website: boolean
  banking_account: BankingAccount
  document: string
  file: FileType
  file_id: string
  has_banking_account: boolean
  id: string
  inserted_at: string
  is_deleted: boolean
  name: string
  updated_at: string
}

export type GetInstitutionsDetailsResponse = {
  data: Institution
}
