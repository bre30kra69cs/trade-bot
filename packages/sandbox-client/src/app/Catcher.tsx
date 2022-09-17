import React, {Component, ReactNode} from 'react';

type CatcherProps = {
  fallback: ReactNode;
  children?: ReactNode;
};

type CatcherState = {
  hasError: boolean;
};

export class Catcher extends Component<CatcherProps, CatcherState> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(): CatcherState {
    return {
      hasError: true,
    };
  }

  render() {
    const {children, fallback} = this.props;
    const {hasError} = this.state;
    return hasError ? fallback : children;
  }
}
