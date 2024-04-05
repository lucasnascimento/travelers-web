const BASE_NAME = 'travelersapp'
const ACCESS_TOKEN = `${BASE_NAME}-access_token`
const EXPIRES_IN_EPOCH = `${BASE_NAME}-expires_in_epoch`

const save = (key: string, data: any) => (
  localStorage.setItem(key, JSON.stringify(data))
)
const load = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
const remove = (key: string) => localStorage.removeItem(key)

const saveAccessToken = (data: any) => save(ACCESS_TOKEN, data)
const loadAccessToken = () => load(ACCESS_TOKEN)
const removeAccessToken = () => remove(ACCESS_TOKEN)
const saveExpiresInEpoch = (data: any) => save(EXPIRES_IN_EPOCH, data)
const loadExpiresInEpoch = () => load(EXPIRES_IN_EPOCH)
const removeExpiresInEpoch = () => remove(EXPIRES_IN_EPOCH)

export const LocalStorage = {
  loadAccessToken,
  loadExpiresInEpoch,
  removeAccessToken,
  removeExpiresInEpoch,
  saveAccessToken,
  saveExpiresInEpoch,
}
