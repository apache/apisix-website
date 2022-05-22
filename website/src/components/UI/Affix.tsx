import type { CSSProperties, ReactNode, FC } from 'react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getDomStyle } from '../../utils';

interface Props {
  style: CSSProperties;
  children: ReactNode;
}

const AffixContent = styled.div`
`;

const getPositionStyle = (
  hasCssSticky: boolean,
  defaultStyles: CSSProperties = {},
):CSSProperties => {
  const { width } = defaultStyles;
  const positionStyle: CSSProperties = hasCssSticky ? {
    position: 'sticky',
    marginLeft: `-${width}px`,
    display: 'inline-block',
    float: 'left',
  } : {
    position: 'absolute',
  };

  return {
    ...positionStyle,
    ...defaultStyles,
  };
};

const Affix: FC<Props> = (props) => {
  const { style, children } = props;
  const [hasCssSticky, SetHasCssSticky] = useState(true);
  useEffect(() => {
    SetHasCssSticky(CSS.supports('position', 'sticky'));
  });

  const positionStyle = getPositionStyle(hasCssSticky, style);

  const defaultHeight = parseInt(`${style.top}`, 10);
  const [height, setHeight] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const getHeight = (element: HTMLElement) => {
    if (element) {
      const parentDom = element.parentElement ?? document.body;
      const parentPaddingBottom = parseInt(getDomStyle(parentDom, 'padding-bottom'), 10);
      setHeight(element.clientHeight);
      setParentHeight(parentDom.clientHeight + parentDom.offsetTop - parentPaddingBottom);
    }
  };

  const getScrollHeight = () => {
    setScrollHeight(() => window.scrollY);
  };

  useEffect(() => {
    if (hasCssSticky) {
      window.addEventListener('scroll', getScrollHeight);
    }
    return () => {
      window.removeEventListener('scroll', getScrollHeight);
    };
  });

  const getScrollStyle = (): CSSProperties => {
    if (hasCssSticky) {
      return positionStyle;
    }

    if (parentHeight > (scrollHeight + window.innerHeight)) {
      return {
        ...positionStyle,
        top: scrollHeight + defaultHeight,
      };
    }

    return {
      ...positionStyle,
      top: parentHeight - height,
    };
  };

  return (
    <AffixContent
      ref={getHeight}
      style={getScrollStyle()}
    >
      {children}
    </AffixContent>
  );
};

export default Affix;
