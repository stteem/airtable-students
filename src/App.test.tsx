import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

describe("Student Name", () => {
  test('renders input label "Student Name"', () => {
    const { getByText, debug, rerender } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  
    expect(getByText(/Student Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();

    //screen.debug();
  });
})



