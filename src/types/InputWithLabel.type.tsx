export type InputWithLabelProps = {
  id: string;
  type?: string;
  value: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
};
