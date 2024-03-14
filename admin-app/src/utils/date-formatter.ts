import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDate = (date: string) => format(parseISO(date), 'dd/MM/yyyy')
export const formatFullDate = (date: string) => format(parseISO(date), 'dd/MMMM/yyyy', { locale: ptBR })
