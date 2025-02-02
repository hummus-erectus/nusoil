import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Clipboard({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M14.1666 18.5225H5.83329C2.49996 18.5225 1.66663 17.6891 1.66663 14.3558V12.6891C1.66663 9.35579 2.49996 8.52246 5.83329 8.52246H14.1666C17.5 8.52246 18.3333 9.35579 18.3333 12.6891V14.3558C18.3333 17.6891 17.5 18.5225 14.1666 18.5225Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 8.52311V6.85645C5 4.09811 5.83333 1.85645 10 1.85645C13.75 1.85645 15 3.52311 15 6.02311"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.99996 15.6061C11.1506 15.6061 12.0833 14.6734 12.0833 13.5228C12.0833 12.3722 11.1506 11.4395 9.99996 11.4395C8.84937 11.4395 7.91663 12.3722 7.91663 13.5228C7.91663 14.6734 8.84937 15.6061 9.99996 15.6061Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
