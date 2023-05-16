import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import {Header} from "./Header";

describe('Header', () => {

    it('should display logo image', async () => {
        render(
            <MemoryRouter>
                    <Header />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('logo')).toBeInTheDocument();
    });

    it('should display buttonGroup', async () => {
        render(
            <MemoryRouter>
                    <Header />
            </MemoryRouter>,
        );

        expect(await screen.findByRole('buttonGroup')).toBeInTheDocument();
    });
});
