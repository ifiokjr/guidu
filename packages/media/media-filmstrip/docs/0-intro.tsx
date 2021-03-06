import { code, Example, md, Props } from '@uidu/docs';
import * as React from 'react';

export default md`
  This component displays multiple media cards horizontally. Allows to navigate through the stored cards.

  ## Usage

  ${code`
  import React from 'react';
  import MediaFilmstrip from '@uidu/media-filmstrip';

  class FilmstripViewExample extends React.Component {
    render() {
      return (
        <MediaFilmstrip files={[]}>
        </MediaFilmstrip>
      );
    }
  }
`}

${(
  <Example
    Component={require('../examples/Basic').default}
    title="Editable"
    source={require('!!raw-loader!../examples/Basic').default}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../src/components/MediaFilmstrip')}
  />
)}
`;
