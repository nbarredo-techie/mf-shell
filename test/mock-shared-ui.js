// Mock shared-ui module for testing
import React from 'react';

export const Button = ({ children, ...props }) => {
  return React.createElement('button', {
    style: {
      padding: '8px 16px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '4px 0',
      display: 'block',
      width: '100%',
      textAlign: 'left'
    },
    ...props
  }, children);
};

export default {
  Button
};
