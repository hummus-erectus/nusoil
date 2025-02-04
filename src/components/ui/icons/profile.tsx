import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Profile({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10.1667 10.6898C12.4679 10.6898 14.3333 8.8243 14.3333 6.52311C14.3333 4.22193 12.4679 2.35645 10.1667 2.35645C7.86548 2.35645 6 4.22193 6 6.52311C6 8.8243 7.86548 10.6898 10.1667 10.6898Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17.3248 19.0233C17.3248 15.7983 14.1165 13.1899 10.1665 13.1899C6.21651 13.1899 3.00818 15.7983 3.00818 19.0233"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
