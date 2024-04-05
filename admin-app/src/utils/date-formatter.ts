import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: string) => format(parseISO(date), 'dd/MM/yyyy')
export const formatFullDate = (date: string) => format(parseISO(date), 'dd/MMMM/yyyy', { locale: ptBR })
export const formatDateAmerican = (date: string | Date) => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'yyyy-MM-dd')
  }

  return format(date, 'yyyy-MM-dd')
}
