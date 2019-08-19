import { FieldBaseProps } from '@uidu/field-base';
import * as React from 'react';

export type FieldDownshiftProps = FieldBaseProps & {
  menu: (props) => void;
  item: (props) => void;
  itemsGetter: (props) => Array<any>;
  items: Array<any>;
  wrapper: React.ComponentClass;
  input: (props) => void;
  onSetValue: (value) => void;
  onChange: (name, value) => void;
  name: string;
  value: any;
};
