import DOMPurify from 'dompurify'

import { Button } from '../../../../components'
import { changeUrlByTagA } from '../../../../utils'

import './styles.css'

type Props = {
  onContinue: () => void
  onPrevious: () => void
  termsAndConditions: string
}

export const TermsAndConditions = ({
  onContinue,
  onPrevious,
  termsAndConditions,
}: Props) => {
  const cleanedTermsHTML = DOMPurify.sanitize(termsAndConditions || '')

  return (
    <>
      <div className="flex flex-col gap-16">
        <section className="flex flex-col gap-3">
          <h2 className="text-3xl font-semibold mb-4">
            Termos e condições
          </h2>
          <div
            className="max-h-96 overflow-y-scroll w-full text-md"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: changeUrlByTagA(cleanedTermsHTML),
            }}
          />
        </section>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-10 gap-4">
        <Button
          onClick={onPrevious}
          variant="outline"
          label="Voltar"
        />
        <Button
          onClick={onContinue}
          label="Aceito os termos"
        />
      </div>
    </>
  )
}
