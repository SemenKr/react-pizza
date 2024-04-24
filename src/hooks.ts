import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";

// Кастомный хук с типизированным диспетчером
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Кастомный хук с типизированным селектором
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected,
) => useSelector(selector);
