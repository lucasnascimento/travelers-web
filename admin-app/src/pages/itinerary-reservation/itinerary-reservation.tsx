import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import {
  AcademicCapIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

import Logo from '../../assets/logo.svg'
import { useGlobalContext } from '../../providers'
import { LocalStorage } from '../../utils'

import {
  FillForm,
  SelectPaymentMethod,
  Success,
  Summary,
  TermsAndConditions,
} from './steps'
import { FormData } from './types'
import { useBookingItineraries } from './hooks'

const reverseDate = (date: string) => date.split('-').reverse().join('/')
const BRReal = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

export const ItineraryReservation = () => {
  const location = ReactRouter.useLocation()
  const navigate = ReactRouter.useNavigate()
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState<FormData | undefined>(
    () => LocalStorage.loadFormData()
  )
  const [paymentUrl, setPaymentUrl] = React.useState('')
  const { mutateAsync } = useBookingItineraries()
  const { password } = useGlobalContext()

  const handleGoBackPage = () => navigate(-1)
  const handleOnFormSubmit = (rawData: FormData) => {
    setFormData(rawData)
    setCurrentStep(1)
  }
  const handleOnContinue = () => setCurrentStep((prevStep) => prevStep + 1)
  const handleOnPrevious = () => setCurrentStep((prevStep) => prevStep - 1)
  const handleOnFinish = async (paymentMethod: string) => {
    try {
      if (paymentMethod === 'pix') {
        LocalStorage.saveFormData(formData)
      } else {
        LocalStorage.removeFormData()
      }

      const newFormData = { ...formData }
      newFormData.travelers = newFormData?.travelers?.map((traveler) => {
        let documents = {}

        if (traveler.traveler_document_type === 'rg') {
          documents = {
            rg: traveler.traveler_extras['document-number-rg'],
          }
        }

        if (traveler.traveler_document_type === 'rne') {
          documents = {
            ...documents,
            rne: traveler.traveler_extras['document-number-rne'],
          }
        }

        if (traveler.traveler_extras['document-number-cpf']) {
          documents = {
            ...documents,
            cpf: traveler.traveler_extras['document-number-cpf'],
          }
        }

        const {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          traveler_document_type,
          traveler_extras: {
            'document-number': documentNumber,
            'document-number-cpf': documentNumberCpf,
            'document-number-rg': documentNumberRg,
            'document-number-rne': documentNumberRne,
            ...extras
          },
          ...rest
        } = traveler

        return {
          ...rest,
          traveler_extras: {
            documents,
            ...extras,
          },
        }
      })

      const data = {
        password: password || '',
        payload: {
          ...newFormData,
          payment_method: paymentMethod,
        },
        resourceId: location.state.itineraryId,
      }

      const response = await mutateAsync(data)
      const url = response.data.invoice_url

      setPaymentUrl(url)
      setCurrentStep((prevStep) => prevStep + 1)
      setTimeout(() => (
        window.open(url, '_blank')?.focus()
      ), 500)
    } catch (error) {
      console.error('error -> ', error)
    }
  }
  const totalPrice = location.state.seatPrice * (
    formData?.travelers.length || 0
  )

  return (
    <>
      <header
        className="pt-8 pb-96 h-96"
        style={{
          background: `
            linear-gradient(
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0.7)
            ),
            url(${location.state.coverImagePath})
            no-repeat
            center/cover
          `,
        }}
      >
        <nav className="container mx-auto px-8 flex flex-start items-center flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex">
            <a href="/" className="-m-1.5 p-1.5">
              <img src={Logo} alt="Terranativa Ecoturismo" className="w-36" />
            </a>
          </div>
        </nav>
        <div className="mt-7 container mx-auto px-8 flex flex-col items-center justify-center gap-12 h-64 md:gap-9">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <h1 className="text-6xl text-center font-bold text-white">
              {location.state.title}
            </h1>
          </div>
          <div className="flex gap-6 flex-col md:flex-row md:gap-14">
            <div className="flex gap-2">
              <AcademicCapIcon className="h-6 w-6 text-white" />
              <p className="text-white">{location.state.groupDescription}</p>
            </div>
            <div className="flex gap-2">
              <CalendarIcon className="h-6 w-6 text-white" />
              <p className="text-white">
                Saída em
                {' '}
                {reverseDate(location.state.boardingDate)}
                {' '}
                e volta
                em
                {' '}
                {reverseDate(location.state.landingDate)}
              </p>
            </div>
            {
              currentStep !== 3 && (
                <div className="flex gap-2">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                  <p className="text-white">
                    {BRReal.format(parseFloat(location.state.seatPrice))}
                    {' '}
                    por
                    viajante
                  </p>
                </div>
              )
            }
            {
              currentStep === 3 && (
                <div className="flex gap-2">
                  <CurrencyDollarIcon className="h-6 w-6 text-white" />
                  <p className="text-white">
                    { BRReal.format(parseFloat(String(totalPrice))) }
                    {' '}
                    para
                    {' '}
                    { formData?.travelers.length || 0 }
                    {' '}
                    viajantes
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </header>
      <main className="container m-auto py-10 px-8">
        {
          currentStep === 0
            ? (
              <FillForm
                formData={formData}
                onSubmit={handleOnFormSubmit}
              />
            )
            : null
        }
        {
          currentStep === 1 && formData
            ? (
              <Summary
                data={{
                  ...formData,
                  itinerary_boarding_date: location.state.boardingDate,
                  itinerary_group: location.state.groupDescription,
                  itinerary_landing_date: location.state.landingDate,
                  itinerary_seat_price: location.state.seatPrice,
                  itinerary_title: location.state.title,
                }}
                onContinue={handleOnContinue}
                onPrevious={handleOnPrevious}
              />
            )
            : null
        }
        {
          currentStep === 2
            ? (
              <TermsAndConditions
                onContinue={handleOnContinue}
                onPrevious={handleOnPrevious}
                termsAndConditions={location.state.termsAndConditions}
              />
            )
            : null
        }
        {
          currentStep === 3
            ? (
              <SelectPaymentMethod
                onPrevious={handleOnPrevious}
                onFinish={handleOnFinish}
              />
            )
            : null
        }
        {
          currentStep === 4
            ? (
              <Success
                onGoBack={handleGoBackPage}
                paymentUrl={paymentUrl}
              />
            )
            : null
        }
      </main>
    </>
  )
}
