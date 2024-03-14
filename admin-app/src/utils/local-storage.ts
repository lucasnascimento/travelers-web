const BASE_NAME = 'travelersapp'
const FORM_DATA = `${BASE_NAME}-form-data`

const save = (key: string, data: any) => (
  localStorage.setItem(key, JSON.stringify(data))
)
const load = (key: string) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : null
}
const remove = (key: string) => localStorage.removeItem(key)
const saveFormData = (data: any) => save(FORM_DATA, data)
const loadFormData = () => load(FORM_DATA)
const removeFormData = () => remove(FORM_DATA)

export const LocalStorage = {
  loadFormData,
  removeFormData,
  saveFormData,
}
