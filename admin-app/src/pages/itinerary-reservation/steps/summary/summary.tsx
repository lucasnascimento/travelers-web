import { FormData } from '../../types'
import { Button } from '../../../../components'

type Props = {
  data: FormData & {
    itinerary_title: string
    itinerary_group: string
    itinerary_boarding_date: string
    itinerary_landing_date: string
    itinerary_seat_price: string
  }
  onContinue: () => void
  onPrevious: () => void
}

const reverseDate = (date: string) => date.split('-').reverse().join('/')
const BRReal = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

const DataValue = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-gray-700 text-sm font-bold">
      { label }
    </p>
    <p className="text-gray-700 leading-tight text-lg">
      { value }
    </p>
  </div>
)

const gender = {
  Female: 'Feminino',
  Male: 'Masculino',
  Other: 'Outro',
}

const documents = {
  cpf: 'CPF',
  rg: 'RG',
  rne: 'RNE',
}

export const Summary = ({ data, onContinue, onPrevious }: Props) => (
  <>
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold mb-4">
          Dados do responsável
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DataValue
            label="Nome"
            value={data.payer_name}
          />
          <DataValue
            label="CPF"
            value={data.payer_document}
          />
          <DataValue
            label="E-mail"
            value={data.payer_email}
          />
          <DataValue
            label="Telefone "
            value={data.payer_phone}
          />
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex flex-row gap-4 items-center mb-4">
          <h2 className="text-3xl font-semibold">
            Dados do viajante
          </h2>
        </div>
        {data.travelers.map((traveler) => (
          <div key={traveler.traveler_name} className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <DataValue
              label="Nome"
              value={traveler.traveler_name}
            />
            <DataValue
              label="Data de nascimento"
              value={reverseDate(traveler.traveler_birthdate)}
            />
            <DataValue
              label="Unidade"
              value={traveler.traveler_extras['room-grade']}
            />
            <DataValue
              label="Gênero"
              value={gender[traveler.traveler_gender]}
            />
            {
              traveler.traveler_extras['document-number'] && (
                <DataValue
                  label={`Número do ${documents[traveler.traveler_document_type as 'cpf' | 'rg' | 'rne']}`}
                  value={traveler.traveler_extras['document-number']}
                />
              )
            }
            {
              traveler.traveler_extras['document-date'] && (
                <DataValue
                  label="Data de expedição"
                  value={reverseDate(traveler.traveler_extras['document-date'])}
                />
              )
            }
            {
              traveler.traveler_extras['document-issuer'] && (
                <DataValue
                  label="Órgão emissor"
                  value={traveler.traveler_extras['document-issuer']}
                />
              )
            }
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold mb-4">
          Dados da viagem
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <DataValue
            label="Destino"
            value={data.itinerary_title}
          />
          <DataValue
            label="Grupo"
            value={data.itinerary_group}
          />
          <DataValue
            label="Saída"
            value={reverseDate(data.itinerary_boarding_date)}
          />
          <DataValue
            label="Volta"
            value={reverseDate(data.itinerary_landing_date)}
          />
          <DataValue
            label="Quantidade de viajantes"
            value={reverseDate(data.travelers.length.toString())}
          />
          <DataValue
            label="Valor total"
            value={
              BRReal.format(
                parseFloat(data.itinerary_seat_price) * data.travelers.length
              )
            }
          />
        </div>
      </section>
    </div>
    <div className="flex flex-col md:flex-row justify-between mt-10 gap-4">
      <Button
        type="submit"
        onClick={onPrevious}
        variant="outline"
        label="Voltar"
      />
      <Button
        type="submit"
        onClick={onContinue}
        label="Ir para termos e condições"
      />
    </div>
  </>
)
