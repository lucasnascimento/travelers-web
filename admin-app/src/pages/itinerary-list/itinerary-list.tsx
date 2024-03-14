import * as ReactRouter from 'react-router-dom'
import { Link } from 'react-router-dom'

import Logo from '../../assets/logo.svg'
import HeroImage from '../../assets/home_header_image.png'
import { useGlobalContext } from '../../providers'
import { routes } from '../../routes'
import { formatFullDate } from '../../utils'

import {
  useGetInstitutionsDetails,
  useGetInstitutionsItineraries,
} from './hooks'

export const ItineraryList = () => {
  const { password } = useGlobalContext()
  const params = ReactRouter.useParams()
  const { data: institutionData } = useGetInstitutionsDetails(params.id || '', password || '')
  const { data: itinerariesData } = useGetInstitutionsItineraries(params.id || '', password || '')

  return (
    <>
      <header
        className="pt-8 pb-24 bg-cover bg-center min-h-96"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <nav className="container mx-auto pl-8 pr-8 flex flex-start items-center flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex">
            <a href="/" className="-m-1.5 p-1.5">
              <img src={Logo} alt="Terranativa Ecoturismo" className="w-36" />
            </a>
          </div>
        </nav>
        <div className="mt-12 container mx-auto px-8 flex flex-col items-center justify-center gap-6">
          <h1 className="text-4xl font-bold text-white">Roteiros</h1>
          <div className="bg-white h-40 w-40 rounded flex flex-col items-center justify-center">
            <img
              className="max-w-32"
              src={institutionData?.data.file.path}
              alt="Terranativa Ecoturismo"
            />
          </div>
        </div>
      </header>
      <main className="pt-10 pb-10">
        <div className="container mx-auto pl-8 pr-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {itinerariesData?.data?.map((itinerary) => (
              <div
                key={itinerary.id}
                className="rounded p-6 flex flex-col items-center gap-4"
                style={{
                  background: `
                    linear-gradient(
                      rgba(0, 0, 0, 0.7),
                      rgba(0, 0, 0, 0.7)
                    ),
                    url(${itinerary.cover_small.path})
                    no-repeat
                    center/cover
                  `,
                }}
              >
                <p className="text-3xl font-bold text-white text-left">
                  {itinerary.title}
                </p>
                <div className="flex flex-col items-center justify-end gap-4 w-full h-full">
                  <div className="w-full">
                    <p className="text-lg text-white">
                      <span className="font-semibold">Turma</span>
                      :
                      {' '}
                      {itinerary.group.description}
                    </p>
                    <p className="text-lg text-white">
                      <span className="font-semibold">Saída</span>
                      :
                      {' '}
                      {formatFullDate(itinerary.boarding_date)}
                    </p>
                  </div>
                  <Link
                    to={routes.roteirosDetalhes.getEndpoint(
                      institutionData?.data.id || '',
                      itinerary.id
                    )}
                    className="rounded text-center transition flex gap-2 items-center justify-center px-4 py-2 text-base border-2 text-white border-white hover:bg-white hover:text-black w-full "
                  >
                    Acesse
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
