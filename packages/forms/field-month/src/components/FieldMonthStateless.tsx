import {
  createAndFireEvent,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '@uidu/analytics';
import classNames from 'classnames';
import React, { Component } from 'react';
import Input from '../styled/Input';
import pkg from '../version.json';

class FieldMonthStateless extends Component<any> {
  static defaultProps = {
    disabled: false,
    isReadOnly: false,
    onChange: () => {},
    required: false,
    type: 'text',
  };

  input?: HTMLInputElement;

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  initElementRef = (input?: HTMLInputElement) => {
    this.input = input;
  };

  render() {
    const {
      showErrors,
      className,
      autoComplete,
      autoFocus,
      disabled,
      id,
      maxLength,
      name,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      onKeyPress,
      onKeyUp,
      pattern,
      placeholder,
      isReadOnly,
      required,
      type,
      value,
    } = this.props;

    return (
      <Input
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        maxLength={maxLength}
        name={name}
        // onBlur={onBlur}
        // onChange={onChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onKeyUp={onKeyUp}
        pattern={pattern}
        placeholder={placeholder}
        readOnly={isReadOnly}
        ref={this.initElementRef}
        required={required}
        type={type}
        value={value}
        className={classNames('form-control', className, {
          // 'is-valid': !showErrors,
          'is-invalid': showErrors,
        })}
      />
    );
  }
}

export { FieldMonthStateless as FieldMonthStatelessWithoutAnalytics };
const createAndFireEventOnGuidu = createAndFireEvent('uidu');

export default withAnalyticsContext({
  componentName: 'fieldMonth',
  packageName: pkg.name,
  packageVersion: pkg.version,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnGuidu({
      action: 'blurred',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldMonth',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),

    onFocus: createAndFireEventOnGuidu({
      action: 'focused',
      actionSubject: 'textField',

      attributes: {
        componentName: 'fieldMonth',
        packageName: pkg.name,
        packageVersion: pkg.version,
      },
    }),
  })(FieldMonthStateless),
);
