import { Button, Input } from '../../components'

import { STRINGS } from './strings'

export const Login = () => {
  return (
    <main className="h-full p-6 flex items-center justify-center">
      <div className="p-6 min-w-96 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col gap-2">
          <Input
            id="email"
            type="text"
            label={STRINGS.email_label}
            name="email"
            placeholder={STRINGS.email_placeholder}
          />
          <Input
            id="password"
            type="text"
            label={STRINGS.password_label}
            name="password"
            placeholder={STRINGS.password_placeholder}
          />
        </div>
        <div className="mt-6">
          <Button label="Entrar" fullWidth  />
        </div>
      </div>
    </main>
  )
}
