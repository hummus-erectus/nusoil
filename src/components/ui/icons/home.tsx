import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Home({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M10.8333 15.6899V13.1899"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.22495 3.03998L3.44995 7.66498C2.79995 8.18165 2.38328 9.27331 2.52495 10.09L3.63328 16.7233C3.83328 17.9066 4.96661 18.865 6.16661 18.865H15.4999C16.6916 18.865 17.8333 17.8983 18.0333 16.7233L19.1416 10.09C19.2749 9.27331 18.8583 8.18165 18.2166 7.66498L12.4416 3.04831C11.5499 2.33165 10.1083 2.33165 9.22495 3.03998Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
