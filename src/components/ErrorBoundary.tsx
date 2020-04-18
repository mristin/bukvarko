import React from 'react';

import { Unfortunately } from './Unfortunately';

export class ErrorBoundary extends React.Component<{}, { error: Error | undefined }> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error: error };
  }

  render() {
    if (this.state.error !== undefined) {
      return <Unfortunately error={this.state.error.toString()} />;
    }

    return this.props.children;
  }
}
