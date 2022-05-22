import type { CSSProperties, ReactNode, FC } from 'react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { getDomStyle, checkCssRule } from '../../utils';

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
  const positionStyle: CSSProperties = hasCssSticky ? {
    position: 'sticky',
    width: 0, // fix float left width
  } : {
    position: 'absolute',
  };

  return {
    ...defaultStyles,
    ...positionStyle,
  };
};

const Affix: FC<Props> = (props) => {
  const { style, children } = props;
  const hasCssSticky = checkCssRule('position', 'sticky');
  const positionStyle = getPositionStyle(hasCssSticky, style);

  if (hasCssSticky) {
    return (
      <AffixContent style={positionStyle}>
        {children}
      </AffixContent>
    );
  }

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
    window.addEventListener('scroll', getScrollHeight);
    return () => {
      window.removeEventListener('scroll', getScrollHeight);
    };
  });

  const getScrollTop = (): number => {
    if (parentHeight > (scrollHeight + window.innerHeight)) {
      return scrollHeight + defaultHeight;
    }

    return parentHeight - height;
  };

  return (
    <AffixContent
      ref={getHeight}
      style={{
        ...positionStyle,
        top: getScrollTop(),
      }}
    >
      {children}
    </AffixContent>
  );
};

export default Affix;
