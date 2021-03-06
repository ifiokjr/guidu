import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { BoardComponents, ItemProps } from '../types';

type Props = {
  item: ItemProps;
  isDragging: boolean;
  provided: DraggableProvided;
  isGroupedOver?: boolean;
  components: BoardComponents;
  columnDefs?: any;
};

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function ItemItem(props: Props) {
  const {
    item,
    components,
    isDragging,
    isGroupedOver,
    provided,
    columnDefs,
  } = props;

  const { item: Item } = components;

  return (
    <Item
      item={item}
      provided={provided}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      columnDefs={columnDefs}
    >
      {item.content}
    </Item>
  );
}

export default React.memo<Props>(ItemItem);
