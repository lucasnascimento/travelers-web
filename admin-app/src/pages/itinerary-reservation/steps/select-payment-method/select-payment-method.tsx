import * as React from 'react'
import { CreditCardIcon, QrCodeIcon } from '@heroicons/react/24/outline'

import { Button } from '../../../../components'

type Props = {
  onPrevious: () => void
  onFinish: (paymentMethod: string) => Promise<void>
}

export const SelectPaymentMethod = ({ onFinish, onPrevious }: Props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState('')

  const handleOnClick = (selectedPaymentMethod: string) => () => (
    setPaymentMethod(selectedPaymentMethod)
  )
  const handleOnFinish = () => {
    setIsLoading(true)

    if (paymentMethod) {
      onFinish(paymentMethod)
        .finally(() => setIsLoading(false))
    }
  }

  return (
    <>
      <div className="flex flex-col gap-16">
        <section className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold mb-4">
            Forma de pagamento
          </h2>
          <div className="flex flex-col md:flex-row gap-8 align-items">
            <button
              onClick={handleOnClick('pix')}
              type="button"
              className={`w-full md:w-64 rounded flex flex-col items-center gap-2 py-9 px-14 border-2 ${paymentMethod === 'pix' ? 'border-indigo-600' : 'border-black'} hover:border-indigo-600`}
            >
              <QrCodeIcon className={`h-24 w-24 ${paymentMethod === 'pix' ? 'text-indigo-600' : 'text-black'} hover:text-indigo-600`} />
              <p className={`text-lg ${paymentMethod === 'pix' ? 'text-indigo-600' : 'text-black'} hover:text-indigo-600`}>
                PIX
              </p>
            </button>
            <button
              onClick={handleOnClick('credit_card')}
              type="button"
              className={`w-full md:w-64 rounded flex flex-col items-center gap-2 py-9 px-14 border-2 ${paymentMethod === 'credit_card' ? 'border-indigo-600' : 'border-black'} hover:border-indigo-600`}
            >
              <CreditCardIcon className={`h-24 w-24 ${paymentMethod === 'credit_card' ? 'text-indigo-600' : 'text-black'} hover:text-indigo-600`} />
              <p className={`text-lg ${paymentMethod === 'credit_card' ? 'text-indigo-600' : 'text-black'} hover:text-indigo-600`}>
                Cartão de crédito
              </p>
            </button>
          </div>
        </section>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-10 gap-4">
        <Button
          onClick={onPrevious}
          variant="outline"
          label="Voltar"
        />
        <Button
          loading={isLoading}
          disabled={!paymentMethod}
          onClick={handleOnFinish}
          label="Ir para checkout"
        />
      </div>
    </>
  )
}
