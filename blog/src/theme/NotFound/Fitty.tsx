/* eslint-disable react/require-default-props */
import type {
  ElementType,
  FC, HTMLAttributes, MutableRefObject,
} from 'react';
import React, { forwardRef } from 'react';
import fitty from 'fitty';
import './fit.css';
import clsx from 'clsx';

type FittyComponentProps = HTMLAttributes<HTMLDivElement> & {
    tagName: string;
    wrapText?: boolean;
}

type ElRef = MutableRefObject<HTMLElement>

const FittyComponent: FC<FittyComponentProps> = (
  props,
  ref?: ElRef,
) => {
  const {
    tagName, children, wrapText = false, className, ...rest
  } = props;
  const minSize = 10;
  const maxSize = 512;
  const Tag = tagName as ElementType;
  const internalRef = React.useRef<HTMLElement>(null);
  const correctRef = ref || internalRef;

  React.useLayoutEffect(() => {
    const effectRef = ref || internalRef;
    const fitInstance = fitty(effectRef?.current, {
      minSize,
      maxSize,
      multiLine: wrapText,
      observeMutations: {
        subtree: true,
        childList: true,
        characterData: true,
        attributeFilter: ['class'],
      },
    });

    requestAnimationFrame(() => {
      fitInstance.fit();
    });

    return () => {
      fitty(effectRef.current!).unsubscribe();
    };
  }, []);

  return (
    <Tag className={clsx('fit-wrapper', className)}>
      <span className="fit" ref={correctRef} {...rest}>
        {children}
      </span>
    </Tag>
  );
};

const Fitty = forwardRef<HTMLElement, FittyComponentProps>(FittyComponent as any);

export default Fitty;
