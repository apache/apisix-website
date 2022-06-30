import { useLayoutEffect, useState } from 'react';

type WindowWidth = number
type WindowHeight = number
type UseWindowSize = () => [WindowWidth, WindowHeight];

const useWindowSize: UseWindowSize = () => {
  const [size, setSize] = useState<[WindowWidth, WindowWidth]>([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

export default useWindowSize;
