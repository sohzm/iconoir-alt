import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgMaximize(
  props: SvgProps,
  svgRef?: React.Ref<React.Component<SvgProps>>
) {
  return (
    <Svg
      width="1.5em"
      height="1.5em"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      ref={svgRef}
      {...props}
    >
      <Path
        d="M7 4H4v3M17 4h3v3M7 20H4v-3M17 20h3v-3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const ForwardRef = React.forwardRef(SvgMaximize);
export default ForwardRef;
