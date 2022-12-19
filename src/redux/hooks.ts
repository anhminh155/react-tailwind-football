import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState } from "./rootReducer"
import { AppDispatch } from "./store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatchRoot: () => AppDispatch = useDispatch
export const useSelectorRoot: TypedUseSelectorHook<RootState> = useSelector