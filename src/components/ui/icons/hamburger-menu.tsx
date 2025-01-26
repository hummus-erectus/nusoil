import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function HamburgerMenu({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M1 17.3452H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 9.34521H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1 1.34521H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
