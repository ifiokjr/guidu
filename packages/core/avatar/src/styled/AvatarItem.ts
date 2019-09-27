import {
  borderRadius,
  colors,
  gridSize,
  math,
  themed,
  // @ts-ignore
  withTheme,
} from '@uidu/theme';
import styled, { css } from 'styled-components';
import { AvatarClickType } from '../types';

const focusBorderColor = themed({ light: colors.B200, dark: colors.B75 });
const textColors = themed({ light: colors.N900, dark: colors.DN600 });
const subtleTextColors = themed({ light: colors.N200, dark: colors.DN300 });

interface GetBackgroundColorType {
  backgroundColor?: string;
  href?: string;
  isActive?: boolean;
  isHover?: boolean;
  isSelected?: boolean;
  mode: 'dark' | 'light';
  onClick?: AvatarClickType;
}

export function getBackgroundColor({
  backgroundColor,
  href,
  isActive,
  isHover,
  isSelected,
  onClick,
}: GetBackgroundColorType) {
  const isInteractive = href || onClick;

  let themedBackgroundColor = backgroundColor || colors.background;

  // Interaction: Hover
  if (isInteractive && (isHover || isSelected)) {
    themedBackgroundColor = colors.backgroundHover;
  }

  // Interaction: Active
  if (isInteractive && isActive) {
    themedBackgroundColor = colors.backgroundActive;
  }

  return themedBackgroundColor;
}

type getStylesType = {
  href?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  isFocus?: boolean;
  mode: 'dark' | 'light';
  onClick?: AvatarClickType;
};

export function getStyles({
  href,
  isActive,
  isDisabled,
  isFocus,
  onClick,
}: getStylesType) {
  const isInteractive = href || onClick;

  let borderColor = 'transparent';
  let cursor = 'auto';
  let opacity = 1;
  let outline = 'none';
  let pointerEvents = 'auto';

  // Interaction: Focus
  if (isInteractive && isFocus && !isActive) {
    outline = 'none';
    borderColor = focusBorderColor;
  }

  // Disabled
  if (isDisabled) {
    cursor = 'not-allowed';
    opacity = 0.75;
    pointerEvents = 'none';
  }

  // Interactive
  if (isInteractive) {
    cursor = 'pointer';
  }
  return css`
    align-items: center;
    background-color: ${getBackgroundColor};
    border-radius: ${borderRadius}px;
    border: 2px solid ${borderColor};
    box-sizing: content-box;
    color: inherit;
    cursor: ${cursor};
    display: flex;
    font-size: inherit;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    opacity: ${opacity};
    outline: ${outline};
    margin: 0;
    padding: ${math.divide(gridSize, 2)}px;
    pointer-events: ${pointerEvents};
    text-align: left;
    text-decoration: none;
    width: 100%;
  `;
}

const truncateText = (p: { truncate: boolean }) =>
  p.truncate &&
  css`
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;

export const Content = styled.div<{
  truncate: boolean;
}>`
  ${truncate =>
    truncate &&
    css`
      max-width: 100%;
      min-width: 0;
    `}
  flex: 1 1 100%;
  line-height: 1.4;
  padding-left: ${gridSize}px;
`;

export const PrimaryText = withTheme(styled.div`
  ${truncateText} color: ${textColors};
`);

export const SecondaryText = withTheme(styled.div`
  ${truncateText} color: ${subtleTextColors};
  font-size: 0.85em;
`);
