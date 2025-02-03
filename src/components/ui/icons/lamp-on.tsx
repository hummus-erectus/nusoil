import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function LampOn({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M6.91672 15.2236V14.2569C5.00005 13.0986 3.42505 10.8402 3.42505 8.44025C3.42505 4.31525 7.21672 1.08192 11.5 2.01525C13.3834 2.43192 15.0334 3.68192 15.8917 5.40692C17.6334 8.90692 15.8 12.6236 13.1084 14.2486V15.2153C13.1084 15.4569 13.2 16.0152 12.3084 16.0152H7.71672C6.80005 16.0236 6.91672 15.6653 6.91672 15.2236Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.08337 18.5234C8.99171 17.9818 11.0084 17.9818 12.9167 18.5234"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
