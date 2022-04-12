import type { MutableRefObject } from 'react';
import { useEffect } from 'react';

const useOutsideClick = (ref: MutableRefObject<HTMLDivElement>, callback: () => void): void => {
  const handleClick = (e: MouseEvent & { target: HTMLDivElement }) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
