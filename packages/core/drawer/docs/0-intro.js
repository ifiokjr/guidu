// @flow
import React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`
  This package exports \`Drawer\` and \`DrawerBase\` components.

  You can wrap \`Drawer\` around any other React component to display the given
  \`children\` when the user hovers over the wrapped component.

## Usage

  ${code`import Drawer from '@uidu/drawer';`}

  ${(
    <Example
      packageName="@uidu/drawer"
      Component={require('../examples/00-basic-drawer')}
      source={require('!!raw-loader!../examples/00-basic-drawer')}
      title="Basic"
    />
  )}

  ${(
    <Example
      packageName="@uidu/drawer"
      Component={require('../examples/01-drawer-origins')}
      source={require('!!raw-loader!../examples/01-drawer-origins')}
      title="Origins"
    />
  )}

  Below is a basic example of how to define width.

  ${(
    <Example
      packageName="@uidu/drawer"
      Component={require('../examples/05-drawer-widths')}
      source={require('!!raw-loader!../examples/05-drawer-widths')}
      title="Drawer Width"
      componentProps={{ test: true }}
    />
  )}

  Drawers have three standard sizes available; \`full\`, \`narrow\`, and \`wide\`, controlling if the content should be remounted on close passing the \`shouldUnmountOnExit\` prop. So that you can retain the drawer content and use it next time the component is displayed.


  Default value of \`shouldUnmountOnExit\` prop: \`false\`


  ${(
    <Example
      packageName="@uidu/drawer"
      Component={require('../examples/15-retain-drawer-contents-on-close')}
      source={require('!!raw-loader!../examples/15-retain-drawer-contents-on-close')}
      title="Retain content when drawer is closed"
    />
  )}

  The component is listening to be closed if the component is opened and the user clicks on 'ESC' keyboard button.

  ${(
    <Props
      heading="Drawer Props"
      props={require('!!extract-react-types-loader!../src/components/index')}
    />
  )}
`;