import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppThunkDispatch, RootState } from "./rootReducer"
import { AppDispatch } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useDispatchRoot: () => AppDispatch = useDispatch<AppThunkDispatch>()
export const useDispatchRoot = () => useDispatch<AppThunkDispatch>();

export const useSelectorRoot: TypedUseSelectorHook<RootState> = useSelector