import * as React from 'react';
import { md, Example, Props, code } from '@uidu/docs';

export default md`

  Buttons are used as triggers for actions. They are used in renderers, toolbars,
  dialog footers and as stand-alone action triggers.

  Button also exports a message-renderer-group component to make it easy to display
  multiple message-renderers together.

  ## Usage

  ${code`import MessageForm from '@uidu/message-renderer';`}

  ${(
    <Example
      packageName="@uidu/message-renderer"
      Component={require('../examples/Basic').default}
      title="Your Appearance Options"
      source={require('!!raw-loader!../examples/Basic')}
    />
  )}

  ${(
    <Props
      heading="Button Props"
      props={require('!!extract-react-types-loader!../src/components/MessageRenderer')}
    />
  )}
`;