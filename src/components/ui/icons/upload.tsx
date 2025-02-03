import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Upload({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10.5488 13.8462V9.78369"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.5312 11.8149H8.46875"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.625 9.37744V14.2524C18.625 17.5024 17.8125 18.3149 14.5625 18.3149H6.4375C3.1875 18.3149 2.375 17.5024 2.375 14.2524V6.12744C2.375 2.87744 3.1875 2.06494 6.4375 2.06494H7.65625C8.875 2.06494 9.14312 2.42244 9.60625 3.03994L10.825 4.66494C11.1337 5.07119 11.3125 5.31494 12.125 5.31494H14.5625C17.8125 5.31494 18.625 6.12744 18.625 9.37744Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
      />
    </Svg>
  );
}
