import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  ### Dashboard Manager
  <p class="lead">Create and edit any dashboards</p>

  Buttons are used as triggers for actions. They are used in forms, toolbars,
  dialog footers and as stand-alone action triggers.
  Button also exports a chat-window-group component to make it easy to display
  multiple chat-windows together.

  ${code`import Stepper, { Step } from '@uidu/stepper';`}

  ${(
    <Example
      packageName="@uidu/stepper"
      Component={require('../examples/Basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/Basic').default}
    />
  )}

  ${(
    <Props
      heading="Step Props"
      props={require('!!extract-react-types-loader!../src/components/DashboardManager')}
    />
  )}
`;
