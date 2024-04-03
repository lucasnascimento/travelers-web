export type Props = {
  children: React.ReactNode
}

export const Card = ({ children }: Props) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-slate-900 dark:border-gray-700">
    { children }
  </div>
)
