import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function CircleTick({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M13.9537 2.35891L13.9536 2.35905L7.36476 8.94788L4.64958 6.23456C4.39944 5.98441 3.99279 5.98441 3.74265 6.23456C3.49251 6.4847 3.49251 6.89135 3.74265 7.14149L6.9113 10.3101C7.03742 10.4363 7.20036 10.4973 7.36477 10.4973C7.52954 10.4973 7.69219 10.4342 7.81795 10.3104L7.81823 10.3102L14.8624 3.26787L14.827 3.23251L14.8624 3.26786C15.1125 3.01772 15.1125 2.61107 14.8624 2.36093C14.6104 2.10893 14.2057 2.10893 13.9537 2.35891Z"
        fill={color}
        stroke={color}
        strokeWidth="0.1"
      />
      <Path
        d="M7.3704 2.00242C8.86098 2.00242 10.2278 2.53491 11.2984 3.41613L12.1384 2.57616C10.854 1.48119 9.19284 0.819336 7.3704 0.819336C3.3074 0.819336 0 4.12673 0 8.18973C0 12.2527 3.3074 15.5601 7.3704 15.5601C11.4334 15.5601 14.7352 12.2527 14.7352 8.18973C14.7352 7.24289 14.557 6.33917 14.2271 5.50482L13.299 6.43291C13.464 6.98977 13.554 7.58038 13.554 8.18973C13.554 11.6021 10.779 14.377 7.37227 14.377C3.95988 14.377 1.18496 11.6021 1.18496 8.18973C1.18309 4.77734 3.958 2.00242 7.3704 2.00242Z"
        fill={color}
      />
    </Svg>
  );
}
