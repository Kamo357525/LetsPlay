import * as React from 'react'
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg'

function EmptyBorderedAvatar() {
  return (
    <Svg
      width={90}
      height={124}
      viewBox="0 0 270 414"
      fill="rgba(204, 204, 204, 0.3)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M213.031 78.982c0 .9-.015 1.797-.045 2.69 16.157 3.634 32.595 6.304 49.156 8.542 6.17.823 7.686 2.866 7.627 8.612-.197 19.548-.168 39.184-.14 58.836.011 7.019.021 14.04.021 21.059 0 6.859-.036 13.718-.073 20.576v.005c-.072 13.716-.145 27.432.073 41.148.922 50.309-19.862 90.991-56.062 124.927-21.135 19.687-45.6 35.555-72.282 46.884-3.078 1.323-7.612 2.043-10.407.794-44.11-19.43-81.766-46.665-107.5-88.067C8.53 301.341.618 274.068.548 246.226c-.16-26.252-.149-52.512-.138-78.762.009-22.969.018-45.93-.086-68.873 0-5.878 1.859-7.672 7.805-8.465 16.499-2.202 32.876-4.852 48.979-8.463-.03-.89-.045-1.784-.045-2.68 0-43.256 34.914-78.32 77.983-78.32 43.07 0 77.984 35.064 77.984 78.32zm45.545 123.443c.033-6.4.067-12.801.067-19.202 0-6.551-.01-13.103-.019-19.652-.027-18.341-.053-36.665.128-54.907.055-5.363-1.338-7.27-7.003-8.038-39.356-5.404-77.947-13.51-113.303-32.918a8.064 8.064 0 00-6.634 0c-35.37 19.34-73.961 27.5-113.303 32.836-5.46.741-7.167 2.414-7.167 7.9.096 21.411.087 42.839.079 64.274-.01 24.497-.02 49.003.126 73.502a140.394 140.394 0 0020.982 73.503c23.63 38.638 58.207 64.053 98.709 82.186 2.567 1.165 6.73.493 9.556-.741a227.858 227.858 0 0066.371-43.754c33.24-31.669 52.324-69.635 51.478-116.584-.201-12.802-.134-25.603-.067-38.405z"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_4890_25127"
          x1={-9.05013}
          y1={70.178}
          x2={278.315}
          y2={70.178}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#873B23" />
          <Stop offset={0.0582217} stopColor="#A66842" />
          <Stop offset={0.276042} stopColor="#E5BA8C" />
          <Stop offset={0.485208} stopColor="#E8D2AE" />
          <Stop offset={0.708333} stopColor="#C09067" />
          <Stop offset={1} stopColor="#A05E2E" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default EmptyBorderedAvatar