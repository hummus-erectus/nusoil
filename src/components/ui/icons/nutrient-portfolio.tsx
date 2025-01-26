import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

// TODO: Replace svg

export function NutrientPortfolio({ color = '#000', ...props }: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M0.654242 1.68904L0.654252 1.68909C0.716431 1.67729 0.780608 1.68095 0.841023 1.69973C1.42731 1.86163 2.01251 1.99873 2.59448 2.13508C3.01893 2.23453 3.44165 2.33356 3.86182 2.44152C4.84819 2.69496 5.79732 2.99263 6.63323 3.44711C7.46633 3.90006 8.17844 4.52153 8.6832 5.40045C9.18249 6.26984 9.47324 7.38129 9.4874 8.81201C9.83686 9.36509 10.137 9.97134 10.384 10.6436C10.6503 9.43971 11.0282 8.44993 11.5139 7.61486C11.5359 6.20926 11.8559 5.09062 12.3874 4.20073C12.9238 3.3025 13.6705 2.64572 14.5256 2.16288C16.0693 1.29124 17.9613 0.950154 19.6659 0.642848C19.8452 0.610514 20.0225 0.578553 20.1971 0.546389L0.654242 1.68904ZM0.654242 1.68904L0.650267 1.6899M0.654242 1.68904L0.650267 1.6899M0.650267 1.6899C0.588757 1.70331 0.531368 1.73158 0.483328 1.7724C0.435273 1.81323 0.398051 1.86537 0.375265 1.92429C0.352475 1.98322 0.344915 2.04691 0.35335 2.10956C0.361707 2.17163 0.385468 2.23051 0.422305 2.28104C1.00913 3.11368 1.46579 3.97842 1.879 4.81698C1.98696 5.03605 2.0922 5.25391 2.19616 5.4691C2.48848 6.07421 2.77056 6.65813 3.07382 7.18822C3.48574 7.90825 3.94971 8.55503 4.56743 9.01895C5.1885 9.4854 5.95302 9.75598 6.91042 9.75598C7.54571 9.75598 8.1699 9.63551 8.94575 9.3666C9.39502 10.1184 9.74985 10.9847 10.0021 12.0023C8.86269 12.1446 7.8256 12.7762 7.25472 13.8219C6.24185 13.8601 5.36205 14.1341 4.72395 14.5819C4.04103 15.0613 3.60634 15.7359 3.60634 16.4614V16.4614M0.650267 1.6899L3.60634 16.4614M3.60634 16.4614C3.60635 16.5627 3.64731 16.6592 3.71933 16.73C3.79127 16.8007 3.88828 16.8399 3.98889 16.8399H17.0122C17.1128 16.8399 17.2098 16.8007 17.2817 16.73C17.3538 16.6592 17.3947 16.5627 17.3947 16.4614C17.3947 15.7359 16.9601 15.0613 16.2771 14.5819C15.639 14.1341 14.7592 13.8601 13.7464 13.8219M3.60634 16.4614L13.7464 13.8219M13.7464 13.8219C13.1619 12.7511 12.0893 12.1123 10.9176 11.9905C11.267 9.50773 12.0232 7.95044 13.062 6.77758C14.1366 5.56425 15.5332 4.74205 17.1816 3.77168L17.2022 3.75951C17.2777 3.71827 17.3374 3.65273 17.3707 3.57309C17.4045 3.49233 17.4091 3.40243 17.3835 3.31866C17.358 3.23494 17.3041 3.16298 17.2315 3.11447C17.159 3.06599 17.072 3.04369 16.9852 3.05093L16.9852 3.05089L16.9817 3.05127C16.9234 3.05751 16.8673 3.07691 16.8177 3.10811C16.7698 3.13631 16.722 3.16442 16.6743 3.19247C15.0838 4.12826 13.6266 4.98557 12.4813 6.27875C12.4517 6.31212 12.4223 6.34581 12.393 6.37983C12.5361 5.55923 12.8086 4.89657 13.1771 4.35251C13.6218 3.69614 14.2114 3.20481 14.8984 2.81687C16.2117 2.07531 17.8748 1.7472 19.4973 1.45166C19.0531 2.18385 18.6864 2.91067 18.3535 3.59472C18.281 3.74365 18.2102 3.89034 18.1407 4.03451C17.8475 4.64213 17.5759 5.20508 17.2891 5.70355C16.9025 6.37566 16.4975 6.91272 15.9874 7.27735C15.4799 7.64021 14.8569 7.85637 13.9889 7.85637C13.8137 7.85637 13.6059 7.82675 13.371 7.78062L13.3697 7.78038C13.3206 7.77119 13.2702 7.77159 13.2212 7.78156C13.1723 7.79154 13.1257 7.81091 13.0841 7.83868C13.0426 7.86646 13.0068 7.90213 12.979 7.94377C12.9512 7.9854 12.9319 8.03216 12.9223 8.08137C12.9128 8.13059 12.9132 8.18118 12.9236 8.23023C12.9339 8.27928 12.954 8.32571 12.9825 8.36688C13.0109 8.40805 13.0473 8.44313 13.0893 8.47024C13.1309 8.49709 13.1774 8.51562 13.226 8.52489C13.4871 8.57617 13.7412 8.6134 13.9889 8.6134C14.9927 8.6134 15.7888 8.35166 16.4308 7.89274L16.3436 7.77071L16.4308 7.89274C17.0697 7.436 17.5433 6.79931 17.9562 6.08166C18.2725 5.53171 18.5609 4.9223 18.8608 4.28832C18.9512 4.0974 19.0425 3.90425 19.1361 3.70982C19.5417 2.8665 19.9912 1.99093 20.5796 1.13733C20.6234 1.07612 20.648 1.00321 20.6499 0.927805C20.6518 0.851747 20.6305 0.77708 20.589 0.71342C20.5476 0.649792 20.488 0.600194 20.4182 0.570594C20.3486 0.541019 20.2716 0.532627 20.1972 0.546369L13.7464 13.8219ZM13.5227 14.5548H13.5238C14.5007 14.5548 15.2921 14.8223 15.8286 15.1988C16.2015 15.4606 16.4133 15.7716 16.5138 16.0829H4.48727C4.5878 15.7716 4.79957 15.4606 5.17246 15.1988L5.08629 15.0761L5.17246 15.1988C5.70894 14.8223 6.50041 14.5548 7.47728 14.5548L7.4784 14.5548C7.55134 14.5542 7.62277 14.5331 7.68417 14.4935C7.7456 14.454 7.79451 14.3977 7.8247 14.3309L7.68804 14.2691L7.82434 14.3317C8.3007 13.2946 9.35318 12.7267 10.5005 12.7267C11.6477 12.7267 12.7001 13.2945 13.1765 14.3313C13.2067 14.3978 13.2556 14.4541 13.3169 14.4935C13.3783 14.5331 13.4497 14.5542 13.5227 14.5548ZM7.89783 5.57212C8.24578 6.11208 8.49529 6.78603 8.61789 7.6478L4.63339 4.6961C4.57963 4.66713 4.51972 4.65139 4.45871 4.65008C4.37161 4.6465 4.28559 4.67247 4.21513 4.7241C4.14398 4.77625 4.09296 4.85149 4.07148 4.9373C4.05 5.02316 4.05959 5.11364 4.09843 5.1931C4.13658 5.27116 4.20041 5.33344 4.27875 5.37024C6.03524 6.28643 7.47205 7.29285 8.5161 8.71401C7.89525 8.91411 7.40021 8.99895 6.91042 8.99895C6.10083 8.99895 5.51426 8.78326 5.02375 8.41487C4.52963 8.04377 4.12235 7.49683 3.73393 6.81787C3.45617 6.33236 3.19062 5.78788 2.90584 5.20397C2.82839 5.04516 2.74951 4.88343 2.66857 4.71917C2.34096 4.05428 1.98172 3.35252 1.55264 2.65119C1.82415 2.71829 2.09318 2.78275 2.35922 2.84649C2.89461 2.97477 3.41793 3.10015 3.92509 3.23837C4.79137 3.47445 5.5874 3.74236 6.26464 4.11057C6.93148 4.47313 7.48654 4.93385 7.89783 5.57212Z"
        stroke={color}
        strokeWidth="0.3"
      />
    </Svg>
  );
}
