import { MediaADFAttrs, MediaSingleLayout } from '@uidu/adf-schema';
import {
  browser,
  ContextIdentifierProvider,
  DEFAULT_IMAGE_HEIGHT,
  DEFAULT_IMAGE_WIDTH,
  MediaSingle,
  ProviderFactory,
  WithProviders,
} from '@uidu/editor-common';
import { Node as PMNode } from 'prosemirror-model';
import { NodeSelection } from 'prosemirror-state';
import { CellSelection } from 'prosemirror-tables';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { Decoration, EditorView } from 'prosemirror-view';
import React, { Component } from 'react';
import { EventDispatcher } from '../../../event-dispatcher';
import {
  getPosHandler,
  getPosHandlerNode,
  SelectionBasedNodeView,
} from '../../../nodeviews/ReactNodeView';
import { createDisplayGrid } from '../../../plugins/grid';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import WithPluginState from '../../../ui/WithPluginState';
import { setNodeSelection, setTextSelection } from '../../../utils';
import { DispatchAnalyticsEvent } from '../../analytics';
import { pluginKey as widthPluginKey } from '../../width';
import { isMobileUploadCompleted } from '../commands/helpers';
import { stateKey as mediaPluginKey } from '../pm-plugins/main';
import { MediaOptions } from '../types';
import ResizableMediaSingle from '../ui/ResizableMediaSingle';
import { floatingLayouts } from '../utils/media-single';
import MediaItem from './media';
import { MediaNodeUpdater } from './mediaNodeUpdater';
import { MediaSingleNodeProps, MediaSingleNodeViewProps } from './types';

export interface MediaSingleNodeState {
  width?: number;
  height?: number;
  viewMediaClientConfig?: any;
  contextIdentifierProvider?: ContextIdentifierProvider;
  isCopying: boolean;
}

export default class MediaSingleNode extends Component<
  MediaSingleNodeProps,
  MediaSingleNodeState
> {
  static defaultProps: Partial<MediaSingleNodeProps> = {
    mediaOptions: {},
  };
  static displayName = 'MediaSingleNode';

  state: MediaSingleNodeState = {
    width: undefined,
    height: undefined,
    viewMediaClientConfig: undefined,
    isCopying: false,
  };

  createMediaNodeUpdater = (props: MediaSingleNodeProps): MediaNodeUpdater => {
    const node = this.props.node.firstChild;

    return new MediaNodeUpdater({
      ...props,
      isMediaSingle: true,
      node: node ? (node as PMNode) : this.props.node,
      dispatchAnalyticsEvent: this.props.dispatchAnalyticsEvent,
    });
  };

  UNSAFE_componentWillReceiveProps(nextProps: MediaSingleNodeProps) {
    if (nextProps.mediaProvider !== this.props.mediaProvider) {
      this.setViewMediaClientConfig(nextProps);
    }

    // Forced updates not required on mobile
    if (nextProps.isCopyPasteEnabled === false) {
      return;
    }

    // We need to call this method on any prop change since attrs can get removed with collab editing
    // the method internally checks if we already have all attrs
    this.createMediaNodeUpdater(nextProps).updateFileAttrs();
  }

  setViewMediaClientConfig = async (props: MediaSingleNodeProps) => {
    const mediaProvider = await props.mediaProvider;
    if (mediaProvider) {
      const viewMediaClientConfig = mediaProvider.viewMediaClientConfig;

      this.setState({
        viewMediaClientConfig,
      });
    }
  };

  updateMediaNodeAttributes = async (props: MediaSingleNodeProps) => {
    const mediaNodeUpdater = this.createMediaNodeUpdater(props);
    // const { addPendingTask } = this.props.mediaPluginState;

    // we want the first child of MediaSingle (type "media")
    const node = this.props.node.firstChild;
    if (!node) {
      return;
    }
  };

  async componentDidMount() {
    const { contextIdentifierProvider } = this.props;

    await Promise.all([
      this.setViewMediaClientConfig(this.props),
      this.updateMediaNodeAttributes(this.props),
    ]);

    this.setState({
      contextIdentifierProvider: await contextIdentifierProvider,
    });
  }

  private onExternalImageLoaded = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => {
    this.setState(
      {
        width,
        height,
      },
      () => {
        this.forceUpdate();
      },
    );
  };

  selectMediaSingle = (event: React.MouseEvent) => {
    event.persist();
    // We need to call "stopPropagation" here in order to prevent the browser from navigating to
    // another URL if the media node is wrapped in a link mark.
    event.stopPropagation();

    const propPos = this.props.getPos();
    const { state } = this.props.view;

    if (event.shiftKey) {
      // don't select text if there is current selection in a table (as this would override selected cells)
      if (state.selection instanceof CellSelection) {
        return;
      }

      setTextSelection(
        this.props.view,
        state.selection.from < propPos ? state.selection.from : propPos,
        // + 3 needed for offset of the media inside mediaSingle and cursor to make whole mediaSingle selected
        state.selection.to > propPos ? state.selection.to : propPos + 3,
      );
    } else {
      setNodeSelection(this.props.view, propPos);
    }
  };

  updateSize = (width: number | null, layout: MediaSingleLayout) => {
    const { state, dispatch } = this.props.view;
    const pos = this.props.getPos();
    if (typeof pos === 'undefined') {
      return undefined;
    }
    const tr = state.tr.setNodeMarkup(pos, undefined, {
      ...this.props.node.attrs,
      layout,
      width,
    });
    tr.setMeta('scrollIntoView', false);
    return dispatch(tr);
  };

  render() {
    const {
      selected,
      getPos,
      node,
      mediaOptions,
      fullWidthMode,
      view: { state },
      view,
    } = this.props;
    const { contextIdentifierProvider, isCopying } = this.state;

    const { layout, width: mediaSingleWidth } = node.attrs;
    const childNode = node.firstChild!;
    let {
      file: {
        metadata: { width, height },
      },
    } = childNode.attrs as MediaADFAttrs;

    if (!width || !height) {
      width = DEFAULT_IMAGE_WIDTH;
      height = DEFAULT_IMAGE_HEIGHT;
    }
    const cardWidth = this.props.width;
    const cardHeight = (height / width) * cardWidth;
    console.log(cardHeight);
    const cardDimensions = {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
    };

    const mediaSingleProps = {
      layout,
      width,
      height,
      containerWidth: this.props.width,
      lineLength: this.props.lineLength,
      pctWidth: mediaSingleWidth,
      fullWidthMode,
    };

    const uploadComplete = isMobileUploadCompleted(
      this.props.mediaPluginState,
      childNode.attrs.id,
    );
    const originalDimensions = {
      width,
      height,
    };
    const MediaChild = (
      <MediaItem
        view={this.props.view}
        node={childNode}
        getPos={this.props.getPos}
        cardDimensions={cardDimensions}
        originalDimensions={originalDimensions}
        viewMediaClientConfig={this.state.viewMediaClientConfig}
        selected={selected()}
        onClick={this.selectMediaSingle}
        onExternalImageLoaded={this.onExternalImageLoaded}
        allowLazyLoading={mediaOptions && mediaOptions.allowLazyLoading}
        uploadComplete={uploadComplete}
        url={childNode.attrs.url}
        contextIdentifierProvider={contextIdentifierProvider}
        isLoading={isCopying}
      />
    );

    let canResize = !!this.props.mediaOptions.allowResizing;

    if (!this.props.mediaOptions.allowResizingInTables) {
      // If resizing not allowed in tables, check parents for tables
      const pos = getPos();
      if (pos) {
        const $pos = state.doc.resolve(pos);
        const { table } = state.schema.nodes;
        const disabledNode = !!findParentNodeOfTypeClosestToPos($pos, [table]);
        canResize = canResize && !disabledNode;
      }
    }

    return canResize ? (
      <ResizableMediaSingle
        {...mediaSingleProps}
        lineLength={
          fullWidthMode
            ? this.props.lineLength
            : this.getLineLength(view, getPos()) || this.props.lineLength
        }
        view={this.props.view}
        getPos={getPos}
        updateSize={this.updateSize}
        displayGrid={createDisplayGrid(this.props.eventDispatcher)}
        gridSize={12}
        viewMediaClientConfig={this.state.viewMediaClientConfig}
        state={this.props.view.state}
        // allowBreakoutSnapPoints={
        //   mediaOptions && mediaOptions.allowBreakoutSnapPoints
        // }
        selected={this.props.selected()}
      >
        {MediaChild}
      </ResizableMediaSingle>
    ) : (
      <MediaSingle {...mediaSingleProps}>{MediaChild}</MediaSingle>
    );
  }

  private getLineLength = (view: EditorView, pos: number): number | null => {
    if (typeof pos !== 'number' || isNaN(pos) || !view) {
      return null;
    }

    const { expand, nestedExpand, layoutColumn } = view.state.schema.nodes;
    const $pos = view.state.doc.resolve(pos);
    const isInsideOfBlockNode = !!findParentNodeOfTypeClosestToPos($pos, [
      expand,
      nestedExpand,
      layoutColumn,
    ]);

    if (isInsideOfBlockNode) {
      const domNode = view.nodeDOM($pos.pos);

      if (
        $pos.nodeAfter &&
        floatingLayouts.indexOf($pos.nodeAfter.attrs.layout) > -1 &&
        domNode &&
        domNode.parentElement
      ) {
        return domNode.parentElement.offsetWidth;
      }

      if (domNode instanceof HTMLElement) {
        return domNode.offsetWidth;
      }
    }

    return null;
  };
}

class MediaSingleNodeView extends SelectionBasedNodeView<
  MediaSingleNodeViewProps
> {
  lastOffsetLeft = 0;
  forceViewUpdate = false;

  createDomRef(): HTMLElement {
    const domRef = document.createElement('div');
    if (
      browser.chrome &&
      this.reactComponentProps.mediaOptions &&
      this.reactComponentProps.mediaOptions.allowMediaSingleEditable
    ) {
      // workaround Chrome bug in https://product-fabric.atlassian.net/browse/ED-5379
      // see also: https://github.com/ProseMirror/prosemirror/issues/884
      domRef.contentEditable = 'true';
    }
    return domRef;
  }

  viewShouldUpdate(nextNode: PMNode) {
    if (this.forceViewUpdate) {
      this.forceViewUpdate = false;
      return true;
    }

    if (this.node.attrs !== nextNode.attrs) {
      return true;
    }

    return super.viewShouldUpdate(nextNode);
  }

  getNodeMediaId(node: PMNode): string | undefined {
    if (node.firstChild) {
      return node.firstChild.attrs.id;
    }
    return undefined;
  }

  update(
    node: PMNode,
    decorations: Decoration[],
    isValidUpdate?: (currentNode: PMNode, newNode: PMNode) => boolean,
  ) {
    if (!isValidUpdate) {
      isValidUpdate = (currentNode, newNode) =>
        this.getNodeMediaId(currentNode) === this.getNodeMediaId(newNode);
    }
    return super.update(node, decorations, isValidUpdate);
  }

  render() {
    const {
      eventDispatcher,
      fullWidthMode,
      providerFactory,
      mediaOptions,
      dispatchAnalyticsEvent,
    } = this.reactComponentProps;

    // getPos is a boolean for marks, since this is a node we know it must be a function
    const getPos = this.getPos as getPosHandlerNode;

    return (
      <WithProviders
        providers={['mediaProvider', 'contextIdentifierProvider']}
        providerFactory={providerFactory}
        renderNode={({ mediaProvider, contextIdentifierProvider }) => {
          return (
            <WithPluginState
              editorView={this.view}
              plugins={{
                width: widthPluginKey,
                mediaPluginState: mediaPluginKey,
              }}
              render={({ width, mediaPluginState }) => {
                const { selection } = this.view.state;
                const isSelected = () =>
                  this.isSelectionInsideNode(selection.from, selection.to) ||
                  (selection instanceof NodeSelection &&
                    selection.from === getPos());

                return (
                  <MediaSingleNode
                    width={width.width}
                    lineLength={width.lineLength}
                    node={this.node}
                    getPos={getPos}
                    mediaProvider={mediaProvider}
                    contextIdentifierProvider={contextIdentifierProvider}
                    mediaOptions={mediaOptions || {}}
                    view={this.view}
                    fullWidthMode={fullWidthMode}
                    selected={isSelected}
                    eventDispatcher={eventDispatcher}
                    mediaPluginState={mediaPluginState}
                    dispatchAnalyticsEvent={dispatchAnalyticsEvent}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }

  ignoreMutation() {
    // DOM has changed; recalculate if we need to re-render
    if (this.dom) {
      const offsetLeft = this.dom.offsetLeft;

      if (offsetLeft !== this.lastOffsetLeft) {
        this.lastOffsetLeft = offsetLeft;
        this.forceViewUpdate = true;

        this.update(this.node, [], () => true);
      }
    }

    return true;
  }
}

export const ReactMediaSingleNode = (
  portalProviderAPI: PortalProviderAPI,
  eventDispatcher: EventDispatcher,
  providerFactory: ProviderFactory,
  mediaOptions: MediaOptions = {},
  fullWidthMode?: boolean,
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent,
  isCopyPasteEnabled?: boolean,
) => (node: PMNode, view: EditorView, getPos: getPosHandler) => {
  return new MediaSingleNodeView(node, view, getPos, portalProviderAPI, {
    eventDispatcher,
    fullWidthMode,
    providerFactory,
    mediaOptions,
    dispatchAnalyticsEvent,
    isCopyPasteEnabled,
  }).init();
};
