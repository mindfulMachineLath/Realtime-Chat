import React from 'react';
import {
  ErrorAppNotification,
  ErrorNotification,
  ErrorPageNotification,
} from 'shared/ui';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  type: 'page' | 'notification' | 'app';
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMsg: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error.message };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, errorMsg: error.message });
  }

  render() {
    const { hasError, errorMsg } = this.state;
    const { children, type } = this.props;

    if (hasError) {
      if (type === 'page') return <ErrorPageNotification errorMsg={errorMsg} />;
      if (type === 'notification')
        return <ErrorNotification errorMsg={errorMsg} />;
      if (type === 'app') return <ErrorAppNotification />;
    }
    return children;
  }
}

export default ErrorBoundary;
