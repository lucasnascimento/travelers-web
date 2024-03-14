export const changeUrlByTagA = (text: string): string => {
  const regexURL = /\b(https?:\/\/[^\s()<>]+)|(www\.[^\s()<>]+)\b/g

  const textWithLink = text.replace(regexURL, (match: string) => {
    if (!match.startsWith('http://') && !match.startsWith('https://')) {
      // eslint-disable-next-line no-param-reassign
      match = `http://${match}`
    }

    return `<a class="text-blue-600" href="${match}" target="_blank">${match}</a>`
  })

  return textWithLink
}
