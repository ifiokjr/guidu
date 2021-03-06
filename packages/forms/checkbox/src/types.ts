import { WithAnalyticsEventsProps } from '@uidu/analytics';
import { FieldBaseProps } from '@uidu/field-base';

export type CheckboxGroupOptionsProps = {
  id: string;
  name: string | React.ReactNode;
  label?: string | React.ReactNode;
  disabled?: boolean;
};

export type CheckboxGroupProps = FieldBaseProps &
  WithAnalyticsEventsProps & {
    options: Array<CheckboxGroupOptionsProps>;
  };

export type CheckboxProps = FieldBaseProps &
  WithAnalyticsEventsProps & {
    /** Sets whether the checkbox is checked or unchecked. */
    isChecked?: boolean;
    /** Sets whether the checkbox is disabled. */
    isDisabled?: boolean;
    /** Sets whether the checkbox is indeterminate. This only affects the
   style and does not modify the isChecked property. */
    isIndeterminate?: boolean;
    /** Marks the field as invalid. Changes style of unchecked component. */
    isInvalid?: boolean;
    /** Marks the field as required & changes the label style. */
    isRequired?: boolean;
  };
