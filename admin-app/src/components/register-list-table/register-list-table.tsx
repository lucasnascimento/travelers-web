/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  // MagnifyingGlassIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'

import { Button } from '../button'
// import { Input } from '../input'

import { STRINGS } from './strings'

export type Props = {
  children: React.ReactNode
  // onSearch: (search: string) => void
  onClickCreate: () => void
  headers: string[]
  onNext?: () => void
  onPrevious?: () => void
  totalResults?: number
  loading?: boolean
}

export const RegisterListTable = ({
  children,
  headers,
  loading = false,
  onClickCreate,
  onNext,
  onPrevious,
  // onSearch,
  totalResults = 0,
}: Props) =>
// const [search, setSearch] = React.useState('')

// const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => (
//   setSearch(event.target.value)
// )
// const handleOnSearch = () => onSearch(search)

  // eslint-disable-next-line implicit-arrow-linebreak
  (
    loading
      ? (
        <div className="flex animate-pulse">
          <span className="w-full h-52 rounded-xl py-40 bg-gray-200 dark:bg-gray-700" />
        </div>
      )
      : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-end md:items-center border-b border-gray-200 dark:border-gray-700">
            {/* <div className="inline-flex gap-x-2">
              <Input
                placeholder={STRINGS.input_search_placeholder}
                icon={MagnifyingGlassIcon}
                onChange={handleOnChange}
              />
              <Button
                label={STRINGS.button_search_label}
                size="sm"
                colorScheme="gray"
                variant="outline"
                onClick={handleOnSearch}
              />
            </div> */}
            {
              onClickCreate && (
                <div className="inline-flex gap-x-2">
                  <Button label={STRINGS.button_create_label} icon={PlusIcon} size="sm" onClick={onClickCreate} />
                </div>
              )
            }
          </div>

          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-slate-800">
              <tr>
                {
              headers.map((header) => (
                <th scope="col" className="ps-6 py-3 text-start" key={header}>
                  <div className="flex items-center gap-x-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                      { header }
                    </span>
                  </div>
                </th>
              ))
            }
                <th scope="col" className="px-6 py-3 text-end" />
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {
                children || (
                  <tr className="text-start">
                    <td colSpan={headers.length + 1} className="text-center py-14 dark:text-white">
                      {STRINGS.table_no_results}
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>

          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{ totalResults }</span>
                {' '}
                {STRINGS.table_results_label}
              </p>
            </div>

            <div>
              <div className="inline-flex gap-x-2">
                <Button
                  label={STRINGS.previous_button_label}
                  icon={ArrowLeftIcon}
                  colorScheme="gray"
                  variant="outline"
                  size="sm"
                  onClick={onPrevious}
                  disabled={!onPrevious}
                />
                <Button
                  label={STRINGS.next_button_label}
                  icon={ArrowRightIcon}
                  iconPosition="right"
                  colorScheme="gray"
                  variant="outline"
                  size="sm"
                  onClick={onNext}
                  disabled={!onNext}
                />
              </div>
            </div>
          </div>
        </div>
      )
  )

export const RegisterListTableRow = (
  { children, key }: { children: React.ReactNode, key?: string }
) => (
  <tr key={key} className="bg-white hover:bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800">
    { children }
  </tr>
)

export const RegisterListTableCol = (
  { children }: { children: React.ReactNode }
) => (
  <td className="text-sm text-gray-500 px-6 py-2">
    { children }
  </td>
)
