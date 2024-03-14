import { DashboardWrapper, RegisterListTable, Stats } from '../../components'

import { STRINGS } from './strings'

export const Institutions = () => (
  <DashboardWrapper
    title={STRINGS.title}
    breadcrumbs={[
      { title: STRINGS.title },
    ]}
  >
    <main className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <Stats
          title="Instituições"
          value={17}
          type="number"
        />
      </section>
      <section>
        <RegisterListTable
          headers={[STRINGS.table_header_name_text, STRINGS.table_header_active_text]}
        />
      </section>
    </main>
  </DashboardWrapper>
)
