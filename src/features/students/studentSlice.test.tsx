import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import { Student }  from './Student';



describe("Text input element", () => {
    it('Displays text input element', () => {
        const { debug, getByTestId, getByRole } = render(
            <Provider store={store}>
                <Student />
            </Provider>
        );
            
        expect(getByTestId('input-display')).toBeInTheDocument();
        expect(getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByTestId('login-btn-display')).toHaveTextContent('Login')

        debug()
    })
})

// Would love to mock a fetch or function call, but seems i 
// need a tad more time to check out the documentation, and 
// i feel the need to submit it today being Friday.


