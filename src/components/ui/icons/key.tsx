import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Key({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" {...props}>
      <Path
        d="M16.4917 12.6311C14.775 14.3394 12.3167 14.8644 10.1584 14.1894L6.23337 18.1061C5.95004 18.3977 5.39171 18.5727 4.99171 18.5144L3.17504 18.2644C2.57504 18.1811 2.01671 17.6144 1.92504 17.0144L1.67504 15.1977C1.61671 14.7977 1.80837 14.2394 2.08337 13.9561L6.00004 10.0394C5.33337 7.87272 5.85004 5.41439 7.56671 3.70605C10.025 1.24772 14.0167 1.24772 16.4834 3.70605C18.95 6.16439 18.95 10.1727 16.4917 12.6311Z"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.7417 14.7637L7.65837 16.6803"
        stroke={color}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.0834 9.35645C12.7737 9.35645 13.3334 8.7968 13.3334 8.10645C13.3334 7.41609 12.7737 6.85645 12.0834 6.85645C11.393 6.85645 10.8334 7.41609 10.8334 8.10645C10.8334 8.7968 11.393 9.35645 12.0834 9.35645Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
