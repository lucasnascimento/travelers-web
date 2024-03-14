export type AuthenticateRequest = {
  username: string
  password: string
}

export type AuthenticateResponse = {
  access_token: string
}
