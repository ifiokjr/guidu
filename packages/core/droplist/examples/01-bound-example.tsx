import Item, { ItemGroup } from '@uidu/item';
import React, { Component } from 'react';
import DropList from '../src';

export default class BoundingExample extends Component<void, void> {
  render() {
    return (
      <div>
        <p>Scroll up to reposition the droplist</p>
        <div
          style={{
            border: '1px solid black',
            height: '200px',
            width: '300px',
            overflow: 'scroll',
          }}
        >
          <div style={{ width: '300px', height: '600px', paddingTop: '200px' }}>
            <DropList boundariesElement="scrollParent" isOpen>
              <ItemGroup title="Australia">
                <Item>Sydney</Item>
                <Item isHidden>Darwin</Item>
                <Item isDisabled>Brisbane</Item>
                <Item>Canberra</Item>
                <Item>Melbourne</Item>
              </ItemGroup>
            </DropList>
          </div>
        </div>
      </div>
    );
  }
}
