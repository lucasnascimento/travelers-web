import { useNavigate } from 'react-router-dom'

import {
  Button,
  DashboardWrapper,
  RegisterListTable,
  RegisterListTableCol,
  RegisterListTableRow,
} from '../../components'
import { routes } from '../../routes'

import { STRINGS } from './strings'
import { useListGroups } from './hooks'

export const Groups = () => {
  const { data, isFetching } = useListGroups()
  const navigate = useNavigate()
  const handleOnClickCreate = () => navigate(routes.groupsCreate.path)
  const handleOnClickEdit = (id: string, description: string) => navigate(
    routes.groupsEdit.getPath(id),
    {
      state: {
        description,
      },
    }
  )

  return (
    <DashboardWrapper
      title={STRINGS.title}
      breadcrumbs={[
        { title: STRINGS.title },
      ]}
    >
      <main className="flex flex-col gap-8">
        <section>
          <RegisterListTable
            onClickCreate={handleOnClickCreate}
            loading={isFetching}
            headers={[
              STRINGS.table_header_name_text,
            ]}
          >
            {
                data?.data.map((group: any) => (
                  <RegisterListTableRow key={group.id}>
                    <RegisterListTableCol>
                      {group.description}
                    </RegisterListTableCol>
                    <RegisterListTableCol>
                      <div className="w-full inline-flex justify-end gap-2">
                        <Button
                          label={STRINGS.button_edit_label}
                          colorScheme="gray"
                          variant="outline"
                          size="sm"
                          onClick={() => handleOnClickEdit(
                            group.id,
                            group.description
                          )}
                        />
                      </div>
                    </RegisterListTableCol>
                  </RegisterListTableRow>
                ))
              }
          </RegisterListTable>
        </section>
      </main>
    </DashboardWrapper>
  )
}
