// @flow
import React from 'react';
import { md, Example, Props, Prop, code } from '@uidu/docs';

export default md`
  \`AvatarGroup\` is a wrapper around avatars designed to render a collection
  of avatars. You will want to use avatar group when you want to stack avatars,
  or have easy collapse states once a set number of avatars are used, including a
  dropdown to show hidden avatars.

  \`AvatarGroup\` takes in a data array. Each object in the array will be turned into
  an \`Avatar\`, with the properties of the object being spread onto an avatar. While
  doing this it is important to remember to include a \`key\` property. For other data,
  see [The avatar documentation](./avatar) for the properties \`Avatar\` accepts.

  ### The Four Exceptions

  There are four props of \`Avatar\` that \`AvatarGroup\` can or will override:

  - \`onAvatarClick\` will be passed to \`onClick\` unless there is an explicit \`onClick\` on the avatar object
  - \`borderColor\` will get the \`AvatarGroup\`'s \`borderColor\`
  - \`size\` will get the \`AvatarGroup\`'s \`size\`
  - \`groupAppearance\` will get the \`AvatarGroup\`'s \`appearance\`

  ## Usage

  ${code`import AvatarGroup from '@uidu/avatar-group';`}

${(
  <Example
    packageName="@uidu/avatar-group"
    Component={require('../examples/02-basicAvatarGroup')}
    title="AvatarGroup"
    source={require('!!raw-loader!../examples/02-basicAvatarGroup')}
  />
)}

${(
  <Props
    heading="Avatar Group Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarGroup')}
    overrides={{
      data: props => {
        /* eslint-disable */
        if (
          props &&
          props.typeValue &&
          props.typeValue.typeParams &&
          props.typeValue.typeParams.params
        ) {
          props.typeValue.typeParams.params = [
            { kind: 'id', name: '@uidu/avatar props' },
          ];
        }
        /* eslint-enable */
        return <Prop {...props} type="Array<@uidu/avatar props>" />;
      },
      avatar: props => {
        // Currently prett-proptypes does not have a good print type for function
        // calls, so we are overriding how this is printed. AK-5133 should resolve
        // this.
        /* eslint-disable */
        if (
          props &&
          props.typeValue &&
          props.typeValue.typeParams &&
          props.typeValue.typeParams.params
        ) {
          props.typeValue.typeParams.params = [
            { kind: 'id', name: '@uidu/avatar' },
          ];
        }
        /* eslint-enable */
        return <Prop {...props} defaultValue="@uidu/avatar" />;
      },
    }}
  />
)}
`;