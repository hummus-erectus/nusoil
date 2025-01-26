import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function NotificationBell({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10.2188 1.58496C11.8576 1.58496 13.4292 2.23648 14.5879 3.39619C15.7467 4.5559 16.3977 6.1288 16.3977 7.76887C16.3977 14.6447 18.9038 15.9997 19.5807 15.9997H0.856934C1.54827 15.9997 4.03998 14.6303 4.03998 7.76887C4.03998 6.1288 4.69096 4.5559 5.84972 3.39619C7.00848 2.23648 8.5801 1.58496 10.2188 1.58496Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.05835 18.6372C8.18285 19.1158 8.4625 19.5396 8.85347 19.842C9.24444 20.1445 9.72463 20.3086 10.2188 20.3086C10.7129 20.3086 11.1931 20.1445 11.5841 19.842C11.9751 19.5396 12.2547 19.1158 12.3792 18.6372"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
