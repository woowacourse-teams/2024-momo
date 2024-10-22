import type { RenderOptions } from '@testing-library/react';
import { renderHook } from '@testing-library/react';

import Providers from './Providers';

export default function render<T>(callback: () => T, options?: Omit<RenderOptions, 'wrapper'>) {
  return renderHook(callback, {
    wrapper: Providers,
    ...options,
  });
}
