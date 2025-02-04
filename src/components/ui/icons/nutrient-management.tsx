import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function NutrientManagement({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M7.66666 19.0231H12.6667C16.8333 19.0231 18.5 17.3564 18.5 13.1898V8.18978C18.5 4.02311 16.8333 2.35645 12.6667 2.35645H7.66666C3.49999 2.35645 1.83333 4.02311 1.83333 8.18978V13.1898C1.83333 17.3564 3.49999 19.0231 7.66666 19.0231Z"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.27501 12.7647L8.25834 10.1897C8.54168 9.82308 9.06668 9.75641 9.43334 10.0397L10.9583 11.2397C11.325 11.5231 11.85 11.4564 12.1333 11.0981L14.0583 8.61475"
        stroke={color}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
