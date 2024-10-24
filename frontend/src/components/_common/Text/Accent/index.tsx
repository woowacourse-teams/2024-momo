import { s_accentTextStyle } from './Accent.styles';

interface AccentProps {
  text: string | number;
}

export default function Accent({ text }: AccentProps) {
  return <span css={s_accentTextStyle}>{text}</span>;
}
