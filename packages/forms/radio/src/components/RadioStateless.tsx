import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import React from 'react';
import { RadioStatelessProps } from '../types';
import pkg from '../version.json';

function RadioStateless({
  value,
  label,
  id,
  name,
  onChange,
  disabled,
  defaultChecked,
  isInline,
}: RadioStatelessProps) {
  return (
    <div
      className={`custom-control custom-radio${
        isInline ? ' custom-control-inline' : ''
      }`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        className="custom-control-input"
        onChange={onChange}
        value={value}
        disabled={disabled}
        defaultChecked={defaultChecked}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export { RadioStateless as RadioStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldRadio',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'radioField',

      attributes: {
        componentName: 'fieldRadio',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(RadioStateless),
);
