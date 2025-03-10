import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function NutrientPortfolio({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M7 20h10" strokeWidth="1.5" />
      <Path d="M10 20c5.5-2.5.8-6.4 3-10" strokeWidth="1.5" />
      <Path
        d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"
        strokeWidth="1.5"
      />
      <Path
        d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"
        strokeWidth="1.5"
      />
    </Svg>
  );
}
