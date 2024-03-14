import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm as useFormReact } from 'react-hook-form'

export const useForm = <T extends FieldValues>(
  schema: any, defaultValues?: any
) => {
  const form = useFormReact<T>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  return form
}
