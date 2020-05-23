import Portal from '@uidu/portal';
import { layers } from '@uidu/theme';
import React, { Children, cloneElement, Component } from 'react';
import { Transition } from 'react-transition-group';
import Wrapper, { flagAnimationTime } from '../../styled/Wrapper';
import { ChildrenType, FunctionType } from '../../types';
import Group, { Inner, SROnly } from './styledFlagGroup';

type Props = {
  /** Flag elements to be displayed. */
  children?: ChildrenType;
  /** Handler which will be called when a Flag's dismiss button is clicked.
   * Receives the id of the dismissed Flag as a parameter.
   */
  onDismissed?: FunctionType;
};

export default class FlagGroup extends Component<Props, {}> {
  private animationTimeoutId: number | undefined;
  private nodeRef: any = React.createRef();

  componentWillUnmount() {
    window.clearTimeout(this.animationTimeoutId);
  }

  renderChildren = () => {
    const { children, onDismissed } = this.props;

    return Children.map(children, (flag: React.ReactElement, index: number) => {
      const isDismissAllowed: boolean = index === 0;
      const { id } = flag.props;

      return (
        // @ts-ignore: Bug in types - 'timeout' prop should not be required when addEndListener is provided
        <Transition
          key={id}
          nodeRef={this.nodeRef}
          addEndListener={(done: (a?: any) => void) => {
            if (index > 0) {
              done();
              return;
            }
            this.nodeRef.current.addEventListener(
              'animationstart',
              (...args) => {
                this.animationTimeoutId = window.setTimeout(
                  () => done(...args),
                  flagAnimationTime,
                );
              },
            );
            this.nodeRef.current.addEventListener('animationend', done);
          }}
        >
          {(transitionState: string) => (
            <Wrapper transitionState={transitionState}>
              {cloneElement(flag, { onDismissed, isDismissAllowed })}
            </Wrapper>
          )}
        </Transition>
      );
    });
  };

  render() {
    return (
      <Portal zIndex={layers.flag()}>
        <Group>
          <SROnly>Flag notifications</SROnly>
          <Inner component="div">{this.renderChildren()}</Inner>
        </Group>
      </Portal>
    );
  }
}
