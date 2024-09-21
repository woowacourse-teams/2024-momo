export interface UseInputResult {
  value: string;
  errorMessage: string | null;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
