export interface AssetsResp {
  id: string;
  symbol: string;
  name: string;
  slug: string;
  profile: any;
  metrics: any;
};

export interface LayoutProps {
  children: React.ReactNode
}

export interface SortProps {
  id: string,
  asc: boolean
}

export interface TableSortProps {
  id: string,
  label: string,
  value: SortProps | undefined,
  onSortChange: (sort: SortProps) => void
}

export interface CoinIconProps {
  id: string,
  className?: string
}

export interface LodinFormProps {
  onLoggedIn: () => void
}

export interface LoginPayloadProps {
  name: string,
  value: string
}

export interface LoginActionProps {
  type: any,
  payload: LoginPayloadProps
}

export interface LoginFormProps {
  email: string,
  password: string
}

export interface LoginModalProps {
  isOpen: boolean
  closeModal: () => void
}

export interface SelectOptionProps {
  value: string;
  symbol: string;
  name: string;
  price_usd: number;
}

export interface AssetsSelectBoxProps {
  value?: SelectOptionProps,
  onChange: (val: SelectOptionProps) => void
}

export interface PrivateRouteProps {
  isLoggedIn: boolean
}

export interface UserProps {
  isLoggedIn: boolean,
  email: string
}

export interface UserState {
  user: UserProps;
  logIn: (email: string) => void;
  logout: () => void;
}

export interface CustomizedLocationStateProps {
  from: string
}