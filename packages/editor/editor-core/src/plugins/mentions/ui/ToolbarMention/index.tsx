import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { PureComponent } from 'react';
import { withAnalytics } from '../../../../analytics';
import ToolbarButton from '../../../../components/ToolbarButton';
import { INPUT_METHOD } from '../../../analytics';
import { insertMentionQuery } from '../../commands/insert-mention-query';

export interface Props {
  editorView?: EditorView;
  isDisabled?: boolean;
}

export interface State {
  disabled: boolean;
}

export default class ToolbarMention extends PureComponent<Props> {
  render() {
    return (
      <ToolbarButton
        spacing="none"
        onClick={this.handleInsertMention}
        disabled={this.props.isDisabled}
        title="Mention @"
        iconBefore={<MentionIcon label="Mention" />}
      />
    );
  }

  private handleInsertMention = withAnalytics(
    'atlassian.fabric.mention.picker.trigger.button',
    (): boolean => {
      if (!this.props.editorView) {
        return false;
      }
      insertMentionQuery(INPUT_METHOD.TOOLBAR)(
        this.props.editorView.state,
        this.props.editorView.dispatch,
      );
      return true;
    },
  );
}