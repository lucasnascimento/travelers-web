import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

export type Props = {
  title: string
  value: number
  type: 'number' | 'percent'
  increasePercent?: number
  decreasePercent?: number
  tooltip?: string
  loading?: boolean
}

export const Stats = ({
  decreasePercent,
  increasePercent,
  loading = false,
  title,
  tooltip,
  type,
  value,
}: Props) => (
  loading
    ? (
      <div className="flex animate-pulse">
        <span className="w-full h-20 rounded-xl py-12 bg-gray-200 dark:bg-gray-700" />
      </div>
    )
    : (
      <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
        <div className="p-4 md:p-5">
          <div className="flex items-center gap-x-2">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              { title }
            </p>
            {
          tooltip
            ? (
              <div className="hs-tooltip">
                <div className="hs-tooltip-toggle">
                  <InformationCircleIcon className="size-4 text-gray-500" />
                  <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-slate-700" role="tooltip">
                    { tooltip }
                  </span>
                </div>
              </div>
            )
            : <></>
        }
          </div>

          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
              { value }
              {' '}
              { type === 'percent' ? '%' : '' }
            </h3>
            {
              increasePercent || decreasePercent
                ? (
                  <span className={`flex items-center gap-x-1 ${increasePercent ? 'text-green-600' : 'text-red-600'}`}>
                    {
                      increasePercent
                        ? <ArrowTrendingUpIcon className="size-4" />
                        : <ArrowTrendingDownIcon className="size-4" />
                    }
                    <span className="inline-block text-sm">
                      { increasePercent || decreasePercent }
                      %
                    </span>
                  </span>
                )
                : <></>
            }
          </div>
        </div>
      </div>
    )
)
