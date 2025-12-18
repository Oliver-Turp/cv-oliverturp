"use client";
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Optional: Log to error reporting service
    console.error('CV Rendering Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          maxWidth: '700px',
          margin: '100px auto',
          padding: '48px',
          background: '#fff',
          border: '3px solid #dc3545',
          borderRadius: '8px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <h1 style={{ 
            color: '#dc3545', 
            marginTop: 0,
            fontSize: '28px',
            fontWeight: 700
          }}>
            ⚠️ CV Configuration Error
          </h1>
          
          <div style={{
            padding: '20px',
            background: '#f8d7da',
            border: '1px solid #f5c2c7',
            borderRadius: '4px',
            marginBottom: '24px'
          }}>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: 1.6,
              margin: 0,
              color: '#842029'
            }}>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
            </p>
          </div>

          <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>
            Common Issues:
          </h2>
          <ul style={{ lineHeight: 1.8, color: '#495057' }}>
            <li>
              <strong>Modern Professional theme:</strong> Requires <code>columns</code> with 
              <code>sidebar</code>, <code>main</code>, and <code>mobile</code> arrays
            </li>
            <li>
              <strong>Other themes:</strong> Require <code>sectionOrder</code> array
            </li>
            <li>
              <strong>Section keys:</strong> Must match keys in <code>content.sections</code>
            </li>
            <li>
              <strong>Theme name:</strong> Must be one of: "minimalist", "bold-header", 
              "visual-timeline", "modern-professional"
            </li>
          </ul>

          <details style={{ marginTop: '32px' }}>
            <summary style={{ 
              cursor: 'pointer', 
              fontWeight: 600,
              padding: '12px',
              background: '#e9ecef',
              borderRadius: '4px',
              userSelect: 'none'
            }}>
              📋 Technical Details (for debugging)
            </summary>
            <pre style={{ 
              marginTop: '12px', 
              padding: '16px', 
              background: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              overflow: 'auto',
              fontSize: '12px',
              lineHeight: 1.5,
              color: '#212529'
            }}>
              {this.state.error && this.state.error.stack}
              {'\n\n'}
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>

          <div style={{
            marginTop: '32px',
            padding: '16px',
            background: '#cfe2ff',
            border: '1px solid #b6d4fe',
            borderRadius: '4px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#084298' }}>
              💡 <strong>Tip:</strong> Check your <code>config.js</code> file and ensure 
              it matches the theme requirements.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;