import {
  ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, PlusIcon, TrashIcon,
} from '@heroicons/react/24/outline'

import { Button } from '../button'
import { Input } from '../input'

import { STRINGS } from './strings'

export type Props = {
  headers: string[]
}

export const RegisterListTable = ({ headers }: Props) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
      <div className="inline-flex gap-x-2">
        <Input placeholder="Digite sua pesquisa" icon={MagnifyingGlassIcon} />
        <Button
          label="Pesquisar"
          size="sm"
          colorScheme="gray"
          variant="outline"
        />
      </div>
      <div className="inline-flex gap-x-2">
        <Button label="Criar" icon={PlusIcon} size="sm" />
      </div>
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
        <tr>
          <td className="ps-6 py-3">
            <div className="flex items-center gap-x-3">
              <img className="inline-block size-[48px] rounded-full" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
              <div className="grow">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">Christina Bersh</span>
              </div>
            </div>
          </td>
          <td className="ps-6 py-3">
            <input
              type="checkbox"
              className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            />
          </td>
          <td className="size-px whitespace-nowrap">
            <div className="px-6 py-1.5 inline-flex gap-2">
              <Button colorScheme="gray" size="sm" variant="outline" label={STRINGS.edit_button_label} />
              <Button colorScheme="red" size="sm" variant="outline" label={STRINGS.delete_button_label} icon={TrashIcon} />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-800 dark:text-gray-200">6</span>
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
          />
          <Button
            label={STRINGS.next_button_label}
            icon={ArrowRightIcon}
            iconPosition="right"
            colorScheme="gray"
            variant="outline"
            size="sm"
          />
        </div>
      </div>
    </div>
  </div>
)
