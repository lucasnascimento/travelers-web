/* eslint-disable no-plusplus */
export const validateCNPJ = (rawCnpj: string): boolean => {
  const cnpj = rawCnpj.replace(/[^\d]/g, '')

  if (cnpj.length !== 14) {
    return false
  }

  const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const cnpjArray = cnpj.split('').map(Number)

  let sum = 0
  for (let i = 0; i < 12; i++) {
    sum += cnpjArray[i] * weights[i + 1]
  }
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder

  if (firstDigit !== cnpjArray[12]) {
    return false
  }

  sum = 0
  for (let i = 0; i < 13; i++) {
    sum += cnpjArray[i] * weights[i]
  }
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder

  return secondDigit === cnpjArray[13]
}
