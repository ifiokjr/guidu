import React, { PureComponent } from 'react';

export default class NavigationGroup extends PureComponent<any> {
  static defaultProps = {
    heading: undefined,
    separator: undefined,
    withPadding: true,
    withMargin: true,
  };

  render() {
    const {
      heading,
      before,
      after,
      separator,
      withPadding,
      withMargin,
      children,
    } = this.props;
    let className = 'nav flex-nowrap';
    if (withMargin) {
      className += ' mr-3';
    }
    if (withPadding) {
      className += ' px-4';
    }

    return <>{children}</>;
  }
}
