import Button from '@uidu/button';
import React, { Component } from 'react';
import { GuiduThemeProvider } from '../src';

interface Props {}
type State = { themeMode: 'light' | 'dark' };

export default class extends Component<Props, State> {
  state: State = { themeMode: 'light' };

  switchTheme = () => {
    const { themeMode } = this.state;
    this.setState({
      themeMode: themeMode === 'light' ? 'dark' : 'light',
    });
  };

  render() {
    const { themeMode } = this.state;
    return (
      <GuiduThemeProvider mode={themeMode}>
        <div style={{ padding: 8 }}>
          <Button onClick={this.switchTheme}>Switch theme ({themeMode})</Button>
          <p>This is the old theming API</p>
        </div>
      </GuiduThemeProvider>
    );
  }
}
