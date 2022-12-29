type PropsAny = { [key: string]: unknown };
export interface Props extends PropsAny {
  children?: React.ReactNode | React.ReactNodeArray;
  key?: string | number | null | undefined;
  className?: string | undefined;
  style?: any;
  setLoading?: (state: boolean) => void;
  disabled?: boolean;
  onClick?: (event: unknown) => void;
}

export type NavbarType = "home" | "matches" | "rankings" | "bracket";
export type LanguageType = "en" | "vi";
