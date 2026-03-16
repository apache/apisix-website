import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import type { ImageProps } from 'rc-image';
import Image from 'rc-image';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

export default {
  ...MDXComponents,
  img: (props: ImageProps): JSX.Element => (
    <LazyLoadComponent>
      <Image {...props} preview={{ mask: 'Click to Preview' }} />
    </LazyLoadComponent>
  ),
};
