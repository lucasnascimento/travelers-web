export type CreateItinerariesRulesRequest = {
  installments: number
  purchase_deadline: string
}

export type CreateItinerariesRulesResponse = {
  data: {
    installments: number
    purchase_deadline: string
  }
}
