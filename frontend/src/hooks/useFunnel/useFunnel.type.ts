import type { ReactElement } from 'react';

export type StepType = Readonly<Array<string>>;

export interface FunnelProps<Steps extends StepType> {
  steps: Steps;
  step: Steps[number];
  children: Array<ReactElement<StepProps<Steps>>>;
}

export type RouteFunnelProps<Steps extends StepType> = Omit<FunnelProps<Steps>, 'steps' | 'step'>;

export interface StepProps<Steps extends StepType> {
  name: Steps[number];
  children: React.ReactNode;
}
