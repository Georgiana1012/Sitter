import React from 'react';
import {
    render,
    screen,
} from '@testing-library/react';

import {SuccessPage} from "./Success";
import * as router from 'react-router'

const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
})

describe('Success', () => {

    it('should display Profile Icon', async () => {

        render(
                <SuccessPage/>
        );

        expect(await screen.findByRole('avatarIcon')).toBeInTheDocument();
    });

    it("should display Welcome Note", async () => {
        render(
            <SuccessPage/>
        );

        expect(await screen.findByRole('welcomeNote')).toBeInTheDocument();
    });
});

