import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Clipboard({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M7.75842 12.4408L9.00842 13.6908L12.3418 10.3574"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M8.33329 5.19076H11.6666C13.3333 5.19076 13.3333 4.35742 13.3333 3.52409C13.3333 1.85742 12.5 1.85742 11.6666 1.85742H8.33329C7.49996 1.85742 6.66663 1.85742 6.66663 3.52409C6.66663 5.19076 7.49996 5.19076 8.33329 5.19076Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M13.3333 3.54004C16.1083 3.69004 17.5 4.71504 17.5 8.52337V13.5234C17.5 16.8567 16.6667 18.5234 12.5 18.5234H7.5C3.33333 18.5234 2.5 16.8567 2.5 13.5234V8.52337C2.5 4.72337 3.89167 3.69004 6.66667 3.54004"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
