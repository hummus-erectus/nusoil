import React from 'react';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

import { colors } from '@/components/ui';

interface CustomMarkerProps {
  number: number;
  color?: string;
  size?: number; // Rendered size in pixels
}

/**
 * CustomMarker renders a map pin based on a typical SVG map marker,
 * but flipped upside-down so that its tip is at the top.
 *
 * The marker is defined in a 256x256 coordinate system. The outer pin shape is
 * drawn from a path (from the provided example) that is flipped vertically.
 * A white circle (a bit larger than the original inner cut-out) is drawn over it,
 * with the number rendered inside.
 *
 * When used in a map, set the Marker’s anchor to { x: 0.5, y: 0 }.
 */
const CustomMarker = ({
  number,
  color = colors.primary,
  size = 40,
}: CustomMarkerProps) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 256 256">
      <Path
        d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Z"
        fill={color}
        transform="translate(0,256) scale(1,-1)"
      />
      {/* White circle placed where the original inner cut-out was (now larger) */}
      <Circle cx="128" cy="154" r="60" fill="white" />
      {/* Number text centered in the white circle */}
      <SvgText
        x="128"
        y="164"
        fill={color}
        fontSize="96"
        fontWeight="bold"
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {number}
      </SvgText>
    </Svg>
  );
};

export default CustomMarker;
