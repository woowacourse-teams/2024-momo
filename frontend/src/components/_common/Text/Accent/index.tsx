import { s_accentTextStyle } from './Accent.styles';

interface AccentProps {
  text: string | number;
}

export default function Accent({ text }: AccentProps) {
  return <strong css={s_accentTextStyle}>{text}</strong>;
}
