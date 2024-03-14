import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

import { Button } from '../../../../components'

type Props = {
  onGoBack: () => void
  paymentUrl: string
}

export const Success = ({ onGoBack, paymentUrl }: Props) => (
  <>
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-3 items-center">
        <CurrencyDollarIcon className="w-44 h-44 text-green-500" />
        <p className="text-2xl font-semibold">
          Realize o pagamento da sua reserva e garanta a sua vaga!
        </p>
        <p>
          Caso você não seja redirecionado para o link de pagamento,
          {' '}
          <a href={paymentUrl} target="_blank" rel="noreferrer" className="text-blue-600">clique aqui</a>
        </p>
      </section>
    </div>
    <div className="flex flex-col md:flex-row justify-end mt-10 gap-4">
      <Button
        onClick={onGoBack}
        label="Voltar para o início"
      />
    </div>
  </>
)
