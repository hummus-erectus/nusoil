import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Logout({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M12.5834 13.8902C12.325 16.8902 10.7834 18.1152 7.40837 18.1152L7.30004 18.1152C3.57504 18.1152 2.08337 16.6236 2.08337 12.8986L2.08337 7.46523C2.08338 3.74023 3.57504 2.24857 7.30004 2.24857L7.40838 2.24857C10.7584 2.24857 12.3 3.4569 12.575 6.4069"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.49994 10.1904L16.9833 10.1904"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.125 12.9814L17.9166 10.1898L15.125 7.39811"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
