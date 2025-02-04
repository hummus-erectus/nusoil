import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Shop({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M2.50842 9.54102V13.2828C2.50842 17.0246 4.00847 18.5246 7.75026 18.5246H12.2421C15.9839 18.5246 17.4839 17.0246 17.4839 13.2828V9.54102"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.0003 10.191C11.5254 10.191 12.6504 8.94932 12.5004 7.42427L11.9504 1.85742H8.05859L7.50024 7.42427C7.35023 8.94932 8.47527 10.191 10.0003 10.191Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15.2588 10.191C16.9422 10.191 18.1755 8.82432 18.0089 7.14926L17.7755 4.85752C17.4755 2.69078 16.6421 1.85742 14.4587 1.85742H11.917L12.5003 7.69928C12.642 9.07433 13.8837 10.191 15.2588 10.191Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4.70011 10.191C6.07516 10.191 7.31687 9.07433 7.4502 7.69928L7.63354 5.85755L8.03356 1.85742H5.49181C3.3084 1.85742 2.47504 2.69078 2.17503 4.85752L1.95002 7.14926C1.78335 8.82432 3.01673 10.191 4.70011 10.191Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M10.0003 14.3574C8.60856 14.3574 7.91687 15.0491 7.91687 16.4408V18.5242H12.0837V16.4408C12.0837 15.0491 11.392 14.3574 10.0003 14.3574Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
