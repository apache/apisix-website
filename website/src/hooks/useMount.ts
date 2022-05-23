import type { EffectCallback } from 'react';
import { useEffect } from 'react';

const useMount = (fn: () => void): void => {
  const callback: EffectCallback = () => {
    fn();
  };
  useEffect(callback, []);
};

export default useMount;
