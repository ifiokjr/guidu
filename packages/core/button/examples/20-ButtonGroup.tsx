import * as React from 'react';
import Button, { ButtonGroup } from '../src';

const Row = (props: React.HTMLProps<HTMLDivElement>) => (
  <div style={{ padding: 8 }} {...props} />
);

export default () => (
  <Row>
    <Row>
      <ButtonGroup appearance="primary">
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button</Button>
      </ButtonGroup>
    </Row>
  </Row>
);
