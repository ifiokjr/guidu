import React from 'react';
import {
  FieldRefTester,
  inputDefaultProps,
} from '../../field-base/examples-utils';
import Checkbox from '../src';

export default function TestRef() {
  return <FieldRefTester {...inputDefaultProps} component={Checkbox} />;
}
