import { code, Example, md, Props } from '@uidu/docs';
import React from 'react';

export default md`

\`Status\` Indicates contextual information by showing a small icon on the avatar. In most
cases, you can pass the string of the status you want directly to avatar instead
of using this component directly.

${code`import { Status } from '@uidu/avatar';`}

${(
  <Example
    packageName="@uidu/avatar"
    Component={require('../examples/05-basicStatus').default}
    title="Status"
    source={require('!!raw-loader!../examples/05-basicStatus').default}
  />
)}

${(
  <Props
    heading="Status Props"
    props={require('!!extract-react-types-loader!../src/components/Status')}
  />
)}
`;
