import * as React from 'react';
import {
  ScrollableContainer,
  ShellBody,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '../src';

export default function Empty() {
  return (
    <>
      <ShellSidebar style={{ width: '4.5rem', backgroundColor: '#4C566A' }}>
        <ShellHeader>
          <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center" />
        </ShellHeader>
        <ScrollableContainer />
        <ShellFooter />
      </ShellSidebar>
      <ShellMain>
        <ShellHeader>
          <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center" />
        </ShellHeader>
        <ShellBody>
          <ShellSidebar
            style={{
              flex: '1 0 22%',
              maxWidth: '22%',
              backgroundColor: '#f8f9fa',
              minWidth: 'fit-content',
            }}
          >
            <ShellHeader>
              <div className="d-flex px-4 border-bottom h-100 w-100 align-items-center" />
            </ShellHeader>
            <ScrollableContainer />
          </ShellSidebar>
          <ShellMain>
            <ScrollableContainer></ScrollableContainer>
          </ShellMain>
        </ShellBody>
      </ShellMain>
    </>
  );
}
