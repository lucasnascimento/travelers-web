import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import {
  AcademicCapIcon,
  ArrowLongDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  DocumentIcon,
  InformationCircleIcon,
  PencilIcon,
  UserIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import Slider from 'react-slick'
import DOMPurify from 'dompurify'

import Logo from '../../assets/logo.svg'
import { useGlobalContext } from '../../providers'
import { routes } from '../../routes'
import { Button, ScrollLink } from '../../components'
import { changeUrlByTagA, formatFullDate } from '../../utils'

import { useGetItinerariesDetails } from './hooks'

const BRReal = new Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  style: 'currency',
})

const settings = {
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: 'linear',
  dots: true,
  infinite: true,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 2,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
  ],
  slidesToScroll: 2,
  slidesToShow: 2,
  speed: 1000,
}

const calculateScrollPercentage = () => {
  if (window.innerWidth > 828) {
    return 0.84
  }

  if (window.innerWidth < 828 && window.innerWidth >= 768) {
    return 0.7
  }

  return 0.5
}

const getButtonDisabled = (status: string) => {
  switch (status) {
    case 'sold_out':
      return true
    case 'booking_closed':
      return true
    default:
      return false
  }
}

const getButtonLabel = (status: string) => {
  switch (status) {
    case 'sold_out':
      return 'Esgotado'
    case 'booking_closed':
      return 'Inscrições encerradas'
    default:
      return 'Inscrição'
  }
}

export const ItineraryDetails = () => {
  const [shouldReduceMenuSize, setShouldReduceMenuSize] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState(0)
  const params = ReactRouter.useParams()
  const { password } = useGlobalContext()
  const { data } = useGetItinerariesDetails(
    params.roteiroId || '',
    password || ''
  )
  const cleanedSummaryHTML = DOMPurify.sanitize(data?.data.summary || '')
  const cleanedDetailsHTML = DOMPurify.sanitize(data?.data.details || '')
  const cleanedCancelationDetailsHTML = DOMPurify.sanitize(
    data?.data.cancelation_rules || ''
  )
  const navigate = ReactRouter.useNavigate()

  const handleTabClick = (index: number) => setActiveTab(index)

  const tabs = [
    {
      content: (
        <div
          className="text-md"
        // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: changeUrlByTagA(cleanedDetailsHTML),
          }}
        />
      ),
      icon: InformationCircleIcon,
      id: 0,
      title: 'Detalhes',
    },
    {
      content: (
        <>
          <p className="mb-8">
            Roteiro sujeito a alterações conforme condições locais,
            {' '}
            meteorológicas e de trânsito.
          </p>
          <div className="flex flex-col gap-8">
            {data?.data.entries.map((entry) => (
              <div className="flex flex-col gap-2" key={entry.id}>
                <p className="text-xl font-semibold">{entry.title}</p>
                <div
                  className="text-md"
                  dangerouslySetInnerHTML={{
                    __html: changeUrlByTagA(
                      DOMPurify.sanitize(entry.description)
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        </>
      ),
      icon: CalendarIcon,
      id: 1,
      title: 'Itinerário',
    },
    {
      content: (
        <div className="flex flex-col gap-8">
          <div
            className="text-md"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: changeUrlByTagA(DOMPurify.sanitize(data?.data.services || '')),
            }}
          />
        </div>
      ),
      icon: WrenchScrewdriverIcon,
      id: 2,
      title: 'Serviços inclusos',
    },
    {
      content: (
        <ul className="flex flex-col gap-4">
          <p>
            Os documentos abaixo possuem orientações em relação
            {' '}
            ao seu preenchimento e assinaturas dos responsáveis.
            {' '}
            Deverão ser impressos e entregues para a coordenação da Escola
            {' '}
            para que o aluno possa embarcar e participar da viagem,
            {' '}
            em até 1 semana antes do embarque.
          </p>

          <p>
            Por favor checar os dados específicos dos
            {' '}
            acompanhantes da sua viagem na sua Escola.
          </p>

          {data?.data.documents.map((document) => (
            <li key={document.id}>
              <a
                href={document.document.path}
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 items-center"
                download={document.title}
              >
                <DocumentIcon className="h-6 w-6" />
                <p>{document.title}</p>
              </a>
            </li>
          ))}
        </ul>
      ),
      icon: DocumentIcon,
      id: 3,
      title: 'Anexos',
    },
    {
      content: (
        <div
          className="text-md"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: changeUrlByTagA(cleanedCancelationDetailsHTML),
          }}
        />
      ),
      icon: CurrencyDollarIcon,
      id: 4,
      title: 'Regras de cancelamento',
    },
    {
      icon: UserIcon,
      id: 5,
      onClick: () => window.open('https://www.terranativa.com.br/nossa-equipe', '_blank'),
      title: 'Equipe',
    },
  ]

  const handleOnClickSubscription = () => {
    const url = routes.roteirosReserva.getEndpoint(
      params.id || '',
      data?.data.id || ''
    )
    const options = {
      state: {
        boardingDate: data?.data.boarding_date,
        coverImagePath: data?.data.cover.path,
        groupDescription: data?.data.group.description,
        institutionId: params.id,
        itineraryId: data?.data.id,
        landingDate: data?.data.landing_date,
        roteiroId: params.roteiroId,
        seatPrice: data?.data.seat_price,
        termsAndConditions: data?.data.terms_and_conditions,
        title: data?.data.title,
      },
    }

    navigate(url, options)
  }

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPercentageByResolution = calculateScrollPercentage()
      const scrollThreshold = window.innerHeight * scrollPercentageByResolution
      const shouldBeScrolled = window.scrollY > scrollThreshold
      setShouldReduceMenuSize(shouldBeScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className="bg-black flex flex-col items-center justify-between pb-4 w-full pt-8 h-svh gap-10"
        style={{
          background: `
            linear-gradient(
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0.7)
            ),
            url(${data?.data.cover.path})
            no-repeat
            center/cover
          `,
        }}
      >
        <nav className="container mx-auto px-8 flex flex-start items-center flex-col gap-10 md:flex-row md:justify-between">
          <a href="/" className="-m-1.5 p-1.5">
            <img src={Logo} alt="Terranativa Ecoturismo" className="w-36" />
          </a>
        </nav>
        <div className="h-full container md:mx-auto px-8 pb-2 pt-2 flex items-center justify-center">
          <div className="flex gap-12 flex-col items-center">
            <div className="flex flex-col items-center gap-12">
              <h1 className="font-regular text-white text-6xl text-center">
                {data?.data.title}
              </h1>
              <Button
                onClick={handleOnClickSubscription}
                icon={PencilIcon}
                label={getButtonLabel(data?.data.status)}
                disabled={getButtonDisabled(data?.data.status)}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-14">
              <div className="flex gap-2">
                <AcademicCapIcon className="text-white h-6 w-6" />
                <p className="text-white text-md">
                  {data?.data.group.description}
                </p>
              </div>
              <div className="flex gap-2">
                <CalendarIcon className="text-white h-6 w-6" />
                <p className="text-white text-mg">
                  Inscrições até
                  {' '}
                  {data?.data.purchase_deadline
                    ? formatFullDate(data?.data.purchase_deadline)
                    : ''}
                </p>
              </div>
              <div className="flex gap-2 justify-center">
                <CalendarIcon className="text-white h-6 w-6" />
                <p className="text-white text-mg text-center sm:text-left">
                  Saída em
                  {' '}
                  {data?.data.boarding_date
                    ? formatFullDate(data?.data.boarding_date)
                    : ''}
                  <div className="block md:hidden" />
                  {' '}
                  e volta em
                  {' '}
                  {data?.data.landing_date
                    ? formatFullDate(data?.data.landing_date)
                    : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <CurrencyDollarIcon className="text-white h-6 w-6" />
                <p className="text-white text-md">
                  {BRReal.format(parseFloat(data?.data.seat_price || ''))}
                  {' '}
                  por
                  pessoa
                </p>
              </div>
              <div className="flex gap-2">
                <UserIcon className="text-white h-6 w-6" />
                <p className="text-white text-md">
                  { (data?.data.seats || 0) - (data?.data.sold_seats || 0) }
                  {' '}
                  vagas disponíveis
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-white text-sm">Ver o roteiro</p>
          <ScrollLink
            to="#roteiro"
            offset={window.innerWidth < 768 ? 300 : 130}
            aria-label="Scroll para Estudos do meio"
          >
            <ArrowLongDownIcon className="h-8 w-8 text-white" />
          </ScrollLink>
        </div>
      </header>
      <section
        className={`flex flex-col items-center justify-center pb-4 w-full fixed top-0 z-30 min-h-32 pt-4
          ${shouldReduceMenuSize ? 'visible' : 'hidden'}
        `}
        style={{
          background: `
            linear-gradient(
              rgba(0, 0, 0, 0.7),
              rgba(0, 0, 0, 0.7)
            ),
            url(${data?.data.cover.path})
            no-repeat
            center/cover
          `,
        }}
      >
        <div className="h-full container md:mx-auto px-8 pb-2 pt-2 flex items-center justify-center">
          <div className="flex gap-10 flex-col lg:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <h1 className="font-bold text-white text-4xl sm:text-center md:text-left">
                {data?.data.title}
              </h1>
              <Button
                onClick={handleOnClickSubscription}
                icon={PencilIcon}
                label={getButtonLabel(data?.data.status)}
                disabled={getButtonDisabled(data?.data.status)}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-14">
              <div className="flex gap-2">
                <AcademicCapIcon className="text-white h-6 w-6" />
                <p className="text-white text-md">
                  {data?.data.group.description}
                </p>
              </div>
              <div className="flex gap-2">
                <CalendarIcon className="text-white h-6 w-6" />
                <p className="text-white text-mg">
                  Inscrições até
                  {' '}
                  {data?.data.purchase_deadline
                    ? formatFullDate(data?.data.purchase_deadline)
                    : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <CalendarIcon className="text-white h-6 w-6" />
                <p className="text-white text-mg text-center sm:text-left">
                  Saída em
                  {' '}
                  {data?.data.boarding_date
                    ? formatFullDate(data?.data.boarding_date)
                    : ''}
                  <div className="block md:hidden" />
                  {' '}
                  e volta em
                  {' '}
                  {data?.data.landing_date
                    ? formatFullDate(data?.data.landing_date)
                    : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <CurrencyDollarIcon className="text-white h-6 w-6" />
                <p className="text-white text-md">
                  {BRReal.format(parseFloat(data?.data.seat_price || ''))}
                  {' '}
                  por
                  pessoa
                </p>
              </div>
              <div className="flex gap-2">
                <UserIcon className="text-white h-6 w-6" />
                <p className="text-white text-md">
                  { (data?.data.seats || 0) - (data?.data.sold_seats || 0) }
                  {' '}
                  vagas disponíveis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <main id="roteiro">
        <section className="bg-gray-50 pt-10 pb-16 md:pt-24 md:pb-20 md:mt-0">
          <div className="container mx-auto px-8 flex flex-col gap-10 md:gap-24">
            <div
              className="text-xl"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: changeUrlByTagA(cleanedSummaryHTML),
              }}
            />
            <Slider {...settings}>
              {data?.data.photos.map((photo) => (
                <div key={photo.id} className="pr-4">
                  <div
                    className="h-64 bg-black px-2 bg-center bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${photo.photo.path})`,
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
        <section className="container mx-auto px-8 py-14">
          <div className="grid gap-16 md:grid-cols-4 md:gap-16">
            <div className="md:col-span-1 flex flex-col gap-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (tab?.onClick) {
                      tab.onClick()
                    } else {
                      handleTabClick(tab.id)
                    }
                  }}
                  className={`flex gap-2 items-center rounded w-full py-4 px-4 text-left text-lg
                              ${
                                activeTab === tab.id
                                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-black'
                              }
                            `}
                >
                  <tab.icon className="h-6 w-6" />
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="md:col-span-3">{tabs[activeTab].content}</div>
          </div>
        </section>
      </main>
    </>
  )
}
