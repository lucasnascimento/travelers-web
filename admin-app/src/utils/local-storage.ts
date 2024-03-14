const BASE_NAME = 'travelersapp'
const LOGIN = `${BASE_NAME}-login`

const save = (key: string, data: any) => (
  localStorage.setItem(key, JSON.stringify(data))
)
const load = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
const remove = (key: string) => localStorage.removeItem(key)
const saveLogin = (data: any) => save(LOGIN, data)
const loadLogin= () => load(LOGIN)
const removeLogin= () => remove(LOGIN)

export const LocalStorage = {
  loadLogin,
  removeLogin,
  saveLogin,
}
