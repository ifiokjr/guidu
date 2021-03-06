import { valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';
import styled from 'styled-components';

const StyledCover = styled.div<{ height: number; cover: string }>`
  height: ${({ height }) => `${height}px`};
  background-size: cover;
  background-position: 50% 50%;
  background-image: ${({ cover }) => cover};
  background-color: rgba(76, 86, 106, 0.025);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cover = ({
  cover,
  item,
  children,
}: {
  cover: any;
  item: any;
  children?: any;
}) => {
  return (
    <StyledCover
      className="card-img-top"
      height={cover && cover.width ? (cover.width * 3) / 2 : 200}
      cover={
        cover && valueRenderer(item.data, cover)
          ? `url(${valueRenderer(item.data, cover)})`
          : null
      }
    >
      {children}
    </StyledCover>
  );
};

const Avatar = ({ avatar, item }) => {
  return (
    <img
      src={valueRenderer(item.data, avatar)}
      style={{ borderRadius: '100%', width: '7rem' }}
    />
  );
};

export default class ItemCover extends PureComponent<any> {
  render() {
    const { item, cover, avatar } = this.props;
    if (avatar || cover) {
      return (
        <Cover cover={cover} item={item}>
          {avatar && <Avatar avatar={avatar} item={item} />}
        </Cover>
      );
    }

    return null;
  }
}
