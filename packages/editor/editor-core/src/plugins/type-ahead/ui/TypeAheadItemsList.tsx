import Item, { ItemGroup, itemThemeNamespace } from '@uidu/item';
import { borderRadius, colors, themed } from '@uidu/theme';
import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import IconFallback from '../../quick-insert/assets/fallback';
import { TypeAheadItem } from '../types';

const itemTheme = {
  [itemThemeNamespace]: {
    padding: {
      default: {
        bottom: 12,
        left: 12,
        right: 12,
        top: 12,
      },
    },
    beforeItemSpacing: {
      default: () => 12,
    },
    borderRadius: () => 0,
    hover: {
      background: colors.transparent,
      text: colors.text,
      secondaryText: colors.N200,
    },
    selected: {
      background: themed({ light: colors.N20, dark: colors.DN70 }),
      text: themed({ light: colors.N800, dark: colors.DN600 }),
      secondaryText: themed({ light: colors.N200, dark: colors.DN300 }),
    },
  },
};

export const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgba(223, 225, 229, 0.5); /* N60 at 50% */
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 40px;
    height: 40px;
  }
`;

const ItemBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  line-height: 1.4;
`;

const ItemText = styled.div`
  white-space: initial;
  .item-description {
    font-size: 11.67px;
    color: ${colors.N200};
    margin-top: 4px;
  }
`;

const ItemAfter = styled.div`
  min-width: 12px;
`;

const KeyHint = styled.div`
  background-color: rgba(223, 225, 229, 0.5); /* N60 at 50% */
  color: ${colors.N100};
  border-radius: ${borderRadius()}px;
  padding: 4px;
  line-height: 12px;
  font-size: 11.67px;
  align-self: flex-end;
`;

const fallbackIcon = (label: string) => {
  return <IconFallback label={label} />;
};

export type TypeAheadItemsListProps = {
  items?: Array<TypeAheadItem>;
  currentIndex: number;
  insertByIndex: (index: number) => void;
  setCurrentIndex: (index: number) => void;
};

export function scrollIntoViewIfNeeded(element: HTMLElement) {
  const { offsetTop, offsetHeight, offsetParent } = element;

  const {
    offsetHeight: offsetParentHeight,
    scrollTop,
  } = offsetParent as HTMLElement;

  const direction =
    offsetTop + offsetHeight > offsetParentHeight + scrollTop
      ? 1
      : scrollTop > offsetTop
      ? -1
      : 0;

  if (direction !== 0 && offsetParent) {
    offsetParent.scrollTop =
      direction === 1
        ? offsetTop + offsetHeight - offsetParentHeight
        : offsetTop;
  }
}

export function TypeAheadItemsList({
  items,
  currentIndex,
  insertByIndex,
  setCurrentIndex,
}: TypeAheadItemsListProps) {
  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <ThemeProvider theme={itemTheme}>
      <ItemGroup>
        {items.map((item, index) => (
          <TypeAheadItemComponent
            key={item.key || item.title}
            item={item}
            index={index}
            currentIndex={currentIndex}
            insertByIndex={insertByIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ))}
      </ItemGroup>
    </ThemeProvider>
  );
}

export type TypeAheadItemComponentProps = {
  item: TypeAheadItem;
  index: number;
  currentIndex: number;
  insertByIndex: (index: number) => void;
  setCurrentIndex: (index: number) => void;
};

export class TypeAheadItemComponent extends React.Component<
  TypeAheadItemComponentProps,
  { ref: HTMLElement | null }
> {
  state = { ref: null };

  shouldComponentUpdate(nextProps: TypeAheadItemComponentProps) {
    return (
      nextProps.item !== this.props.item ||
      this.isSelected(this.props) !== this.isSelected(nextProps)
    );
  }

  isSelected(props: TypeAheadItemComponentProps) {
    return props.index === props.currentIndex;
  }

  insertByIndex = () => {
    this.props.insertByIndex(this.props.index);
  };

  setCurrentIndex = () => {
    this.props.setCurrentIndex(this.props.index);
  };

  handleRef = (ref: HTMLElement | null) => {
    let hasRef = (ref: any): ref is { ref: HTMLElement } => ref && ref.ref;
    this.setState({ ref: hasRef(ref) ? ref.ref : ref });
  };

  componentDidUpdate() {
    const ref = this.state.ref;
    if (this.props.index === this.props.currentIndex && ref) {
      scrollIntoViewIfNeeded(ref);
    }
  }

  render() {
    const { item } = this.props;
    return item.render ? (
      <div ref={this.handleRef} style={{ overflow: 'hidden' }}>
        <item.render
          onClick={this.insertByIndex}
          onHover={this.setCurrentIndex}
          isSelected={this.isSelected(this.props)}
        />
      </div>
    ) : (
      <Item
        onClick={this.insertByIndex}
        onMouseEnter={this.setCurrentIndex}
        elemBefore={
          <ItemIcon>
            {item.icon ? item.icon() : fallbackIcon(item.title)}
          </ItemIcon>
        }
        isSelected={this.isSelected(this.props)}
        aria-describedby={item.title}
        ref={this.handleRef}
      >
        <ItemBody>
          <ItemText>
            <div className="item-title">{item.title}</div>
            {item.description && (
              <div className="item-description">{item.description}</div>
            )}
          </ItemText>
          <ItemAfter>
            {item.keyshortcut && <KeyHint>{item.keyshortcut}</KeyHint>}
          </ItemAfter>
        </ItemBody>
      </Item>
    );
  }
}
