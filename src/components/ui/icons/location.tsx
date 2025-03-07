import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface LocationIconProps {
  color?: string;
  size?: number;
}

export function Location({ color = '#000', size = 24 }: LocationIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
