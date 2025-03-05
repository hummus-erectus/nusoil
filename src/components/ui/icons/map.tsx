import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

interface MapIconProps {
  color?: string;
  size?: number;
}

export function Map({ color = '#000', size = 24 }: MapIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18L2 22V6L9 2M9 18L16 22M9 18V2M16 22L22 18V2L16 6M16 22V6M16 6L9 2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
