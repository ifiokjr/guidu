import styled from 'styled-components';

import { colors, fontFamily } from '@uidu/theme';

export const MediaPickerPopupWrapper = styled.div`
  display: flex;
  cursor: default;
  user-select: none;
  font-family: ${fontFamily()};
  border-radius: 3px;
  position: relative;

  /* Ensure that the modal has a static size */
  width: 968px;
`;

export const SidebarWrapper = styled.div`
  width: 235px;
  min-width: 235px;
  background-color: ${colors.N30};
`;

export const ViewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  /* Height of the Popup should never change */
  height: calc(100vh - 200px);

  background-color: white;
`;