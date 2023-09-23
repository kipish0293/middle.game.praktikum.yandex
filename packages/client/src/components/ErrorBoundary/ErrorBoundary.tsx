import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorFallbackComponent } from './components/ErrorFallbackComponent';
import { ErrorFallbackPage } from './components/ErrorFallbackPage';

interface Properties {
  children: ReactNode;
  isPage?: boolean | false;
  errorDeploy?: boolean | false;
  componentName: string;
}

interface State {
  hasError: boolean;
}

const ErrorBoundDeploy = () => {
  const error = new Error('error');
  throw error;
};

export class ErrorBoundary extends Component<Properties, State> {
  public constructor(properties: Properties) {
    super(properties);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children, isPage, errorDeploy, componentName } = this.props;

    // deploy an error in the DOM f
    if (errorDeploy && !hasError) {
      return (
        <>
          <ErrorBoundDeploy />
          <ErrorFallbackComponent componentName={componentName} />
        </>
      );
    }

    if (hasError) {
      return isPage ? (
        <ErrorFallbackPage />
      ) : (
        <ErrorFallbackComponent componentName={componentName} />
      );
    }

    return children;
  }
}
