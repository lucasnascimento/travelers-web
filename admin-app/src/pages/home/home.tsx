import { DashboardWrapper, Stats } from '../../components'

import { STRINGS } from './strings'

export const Home = () => (
  <DashboardWrapper
    title={STRINGS.title}
    breadcrumbs={[
      { title: STRINGS.title },
    ]}
  >
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <Stats
        title="Instituições"
        value={17}
        type="number"
      />
      <Stats
        title="Roteiros"
        value={29}
        type="number"
      />
      <Stats
        title="Inscrições"
        value={65}
        type="number"
        increasePercent={1.7}
        tooltip="Inscrições na semana"
      />
      <Stats
        title="Reservas pagas"
        value={65}
        type="number"
        decreasePercent={1.7}
        tooltip="Reservas pagas na semana"
      />
      <Stats
        title="Reservas pendentes"
        value={22}
        type="number"
        increasePercent={1.7}
        tooltip="Reservas pendentes na semana"
      />
    </section>
  </DashboardWrapper>
)
