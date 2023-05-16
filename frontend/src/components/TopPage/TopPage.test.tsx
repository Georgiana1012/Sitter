import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import {TopPage} from "./TopPage";

describe('TopPage', () => {

    it('should display whether user is logged in or not', async () => {
        render(
            <MemoryRouter>
                <TopPage />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('authCheck')).toBeInTheDocument();
    });

    it('should display "go to log in" text and "go to sign up" text', async () => {
        render(
            <MemoryRouter>
                <TopPage />
            </MemoryRouter>,
        );

        expect(await screen.findByText('Go to log in page')).toBeInTheDocument();
        expect(await screen.findByText('Go to sign up page')).toBeInTheDocument();
    });
});
