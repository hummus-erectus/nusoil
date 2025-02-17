import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export function Home({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color} {...props}>
      <Path d="M240,208H224V136l2.34,2.34A8,8,0,0,0,237.66,127L139.31,28.68a16,16,0,0,0-22.62,0L18.34,127a8,8,0,0,0,11.32,11.31L32,136v72H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM48,120l80-80,80,80v88H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48Zm96,88H112V160h32Z" />
    </Svg>
  );
}
