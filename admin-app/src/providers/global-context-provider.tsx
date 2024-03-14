import * as React from 'react'

type GlobalContextProps = {
  password: string | null
  updateGlobalPassword: React.Dispatch<React.SetStateAction<string | null>>
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(
  undefined
)

type GlobalContextProviderProps = {
  children: React.ReactNode
}

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [password, updateGlobalPassword] = React.useState<string | null>(null)
  const value = React.useMemo(
    () => ({
      password,
      updateGlobalPassword,
    }),
    [password]
  )

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext)

  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider'
    )
  }

  return context
}
