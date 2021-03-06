import { ClassValue } from 'classnames/types';
import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { FormProps, LayoutType } from '../types';
import FormContext from './FormContext';

const Loading = styled.div<{ isLoading: boolean }>`
  opacity: ${({ isLoading }) => (isLoading ? 0.4 : 1)};
  transition: opacity 0.3ms ease-in;
  ${({ isLoading }) =>
    isLoading &&
    css`
      pointer-events: none;
    `};
`;

function Form({
  footerRenderer = () => {},
  handleSubmit = async model => {},
  inputsWrapperProps = {},
  withLoader = true,
  children,
  forwardedRef,
  // formsy
  layout = 'vertical' as LayoutType,
  className = '' as ClassValue,
  elementWrapperClassName = '' as ClassValue,
  labelClassName = '' as ClassValue,
  rowClassName = '' as ClassValue,
  validateBeforeSubmit = true,
  validatePristine = false,
  disabled = false,
  ...rest
}: FormProps & { forwardedRef: React.Ref<any> }) {
  const form: React.RefObject<Formsy> = useRef(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const enableButton = () => setCanSubmit(true);

  const disableButton = () => setCanSubmit(false);

  const onValidSubmit = (model, resetForm) => {
    setIsLoading(true);
    handleSubmit(model, resetForm).then(() => {
      setIsLoading(false);
    });
  };

  const contextProps = {
    elementWrapperClassName,
    labelClassName,
    layout,
    rowClassName,
    validateBeforeSubmit,
    validatePristine,
  };

  return (
    <FormContext.Provider value={contextProps}>
      <Formsy
        {...rest}
        ref={forwardedRef}
        onValidSubmit={onValidSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        disabled={disabled}
        className={className as string}
        // noValidate
      >
        <Loading {...inputsWrapperProps} isLoading={isLoading || false}>
          {children}
        </Loading>
        {footerRenderer(
          { loading: isLoading, canSubmit },
          form.current,
          onValidSubmit,
        )}
      </Formsy>
    </FormContext.Provider>
  );
}

export default React.forwardRef(
  ({ children, ...otherProps }: FormProps, ref: React.Ref<any>) => (
    <Form forwardedRef={ref} {...otherProps}>
      {children}
    </Form>
  ),
);
