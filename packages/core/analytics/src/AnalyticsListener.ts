import PropTypes from 'prop-types';
import React, { Component } from 'react';
import UIAnalyticsEvent, { UIAnalyticsEventHandler } from './UIAnalyticsEvent';

type Props = {
  /** Children! */
  children?: React.ReactNode;
  /** The channel to listen for events on. */
  channel?: string;
  /** A function which will be called when an event is fired on this Listener's
   * channel. It is passed the event and the channel as arguments. */
  onEvent: (event: UIAnalyticsEvent, channel?: string) => void;
};

const ContextTypes = {
  getAtlaskitAnalyticsEventHandlers: PropTypes.func,
};

export default class AnalyticsListener extends Component<Props> {
  static contextTypes = ContextTypes;
  static childContextTypes = ContextTypes;

  getChildContext = () => ({
    getAtlaskitAnalyticsEventHandlers: this.getAnalyticsEventHandlers,
  });

  getAnalyticsEventHandlers = () => {
    const { channel, onEvent } = this.props;
    const { getAtlaskitAnalyticsEventHandlers } = this.context;
    const parentEventHandlers =
      (typeof getAtlaskitAnalyticsEventHandlers === 'function' &&
        getAtlaskitAnalyticsEventHandlers()) ||
      [];
    const handler: UIAnalyticsEventHandler = (event, eventChannel) => {
      if (channel === '*' || channel === eventChannel) {
        onEvent(event, eventChannel);
      }
    };

    return [handler, ...parentEventHandlers];
  };

  render() {
    return this.props.children;
  }
}
