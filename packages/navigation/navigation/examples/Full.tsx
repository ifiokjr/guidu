import Avatar from '@uidu/avatar';
import Badge from '@uidu/badge';
import Lozenge from '@uidu/lozenge';
import { ShellMain, ShellResizer, ShellSidebar } from '@uidu/shell';
import React, { Component } from 'react';
import { Activity, MoreHorizontal, Settings } from 'react-feather';
import Navigation, { NavigationItem } from '../src';

const schema = [
  {
    type: 'NavigationHeader',
    text: 'Team',
    before: <Avatar borderColor="transparent" />,
  },
  {
    type: 'NavigationSection',
    items: [
      {
        type: 'NavigationGroup',
        items: [
          {
            path: `/`,
            text: 'Riepilogo',
            type: 'NavigationItem',
          },
          {
            path: `/orders`,
            text: 'Ordini',
            type: 'NavigationItem',
          },
          {
            path: `/orders`,
            text: 'Ordini',
            type: 'NavigationSubItem',
          },
          {
            path: `/orders`,
            text: 'Ordini',
            type: 'NavigationSubItem',
          },
          {
            path: `/attendances`,
            text: 'Partecipanti',
            type: 'NavigationItem',
          },
          {
            path: `/messages`,
            text: 'Messaggi agli iscritti',
            type: 'NavigationItem',
          },
        ],
      },
      {
        type: 'NavigationGroup',
        // heading: 'Teams',
        after: <a className="text-transparent">Add</a>,
        items: [
          {
            path: `/`,
            type: 'NavigationItem',
            text: '#general',
            before: (
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'cadetblue',
                  borderRadius: '100%',
                }}
              />
            ),
            after: <Badge max={10}>{20}</Badge>,
          },
          {
            path: `/`,
            type: 'NavigationItem',
            before: (
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'cadetblue',
                  borderRadius: '100%',
                }}
              />
            ),
            text: '#marketing',
          },
          {
            path: `/`,
            type: 'NavigationItem',
            before: (
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'cadetblue',
                  borderRadius: '100%',
                }}
              />
            ),
            text: '#dev',
          },
          {
            type: 'InlineComponent',
            component: () => (
              <NavigationItem
                className="text-center"
                text={<MoreHorizontal />}
                onClick={console.log}
              />
            ),
          },
        ],
      },
      {
        type: 'NavigationGroup',
        before: <Activity size={14} />,
        text: 'Browse',
        heading: 'Browse',
        items: [
          {
            path: `/`,
            type: 'NavigationItem',
            before: (
              <Avatar
                size="xsmall"
                // src={contact.avatar.thumb}
                // name={contact.name}
                name="test with tooltip"
              />
            ),
            text: '#dev',
          },
          {
            type: 'NavigationItem',
            before: <Settings size={18} />,
            text: 'Ordini',
          },
          {
            path: `/attendances`,
            type: 'NavigationItem',
            text: 'Ordini',
            after: <Lozenge>Closed</Lozenge>,
          },
          {
            path: `/messages`,
            type: 'NavigationItem',
            text: 'Messaggi agli iscritti',
          },
        ],
      },
    ],
  },
];

export default class Basic extends Component<any, { isCollapsed: boolean }> {
  state = {
    isCollapsed: false,
  };

  render() {
    const { isCollapsed } = this.state;
    return (
      <>
        <ShellSidebar
          style={{
            transition:
              'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s, min-width 300ms cubic-bezier(0.2, 0, 0, 1) 0s',
            ...(isCollapsed
              ? { width: '24px', minWidth: 0 }
              : { width: '20%', minWidth: '17rem' }),
          }}
        >
          <Navigation schema={schema} />
          <ShellResizer
            isCollapsed={isCollapsed}
            onClick={() => {
              console.log('clicked');
              this.setState((prevState) => ({
                isCollapsed: !prevState.isCollapsed,
              }));
            }}
          />
        </ShellSidebar>
        <ShellMain className="bg-light" />
      </>
    );
  }
}
