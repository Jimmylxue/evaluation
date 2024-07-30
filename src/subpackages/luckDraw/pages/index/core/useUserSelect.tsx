import { getStorageSync, setStorageSync } from "@tarojs/taro";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { DRINK_KEY } from "../const";

type TUserSelect = {
  /**
   * 选择的奶茶 id[]
   */
  selectDrink: number[];

  updateSelectDrink?: (drinks: number[]) => void;
};

const UserSelectContext = createContext<TUserSelect>({
  selectDrink: [],
});

export const UserSelectContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectDrink, setSelectDrink] = useState<number[]>([]);

  useEffect(() => {
    const _drinks = getStorageSync(DRINK_KEY);
    setSelectDrink(_drinks || [1, 2, 3, 4, 5, 6]);
  }, []);

  const updateSelectDrink = (drinks: number[]) => {
    setSelectDrink(drinks);
    setStorageSync(DRINK_KEY, drinks);
  };

  return (
    <UserSelectContext.Provider value={{ selectDrink, updateSelectDrink }}>
      {children}
    </UserSelectContext.Provider>
  );
};

export function useUserSelect() {
  return useContext(UserSelectContext);
}
