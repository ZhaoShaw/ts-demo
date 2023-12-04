import { createContext, useContext, useReducer } from 'react'
import reducer, { initialState } from './patientReducer'
import { PatientsState, PatientsAction } from '../types'

interface StateContextProps {
  state: PatientsState
  dispatch: React.Dispatch<PatientsAction>
}

interface StateProviderProps {
  children: React.ReactNode
}

// const combineReducers =
//   (slices: SlicesState) => (state: AllState, action: AllAction) =>
//     Object.keys(slices).reduce(
//       (acc, prop) => ({
//         ...acc,
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         [prop]: (slices as any)[prop]((acc as any)[prop], action)
//       }),
//       state
//     )

export const StateContext = createContext<StateContextProps>({
  state: initialState,
  dispatch: () => null
})

export const useStateValue = () => useContext(StateContext)

export const StateProvider = ({ children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}
