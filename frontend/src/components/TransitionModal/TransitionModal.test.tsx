
import React from 'react';
import renderer from 'react-test-renderer';
import { TransitionModal } from './TransitionModal';

const mockFn = jest.fn();

describe('TransitionModal', () => {
    it('renders correctly', () => {
        const tree = renderer.create(
            <TransitionModal
                title="Confirm Delete Account"
                message="Are you sure you want to delete your account?"
                buttonLabel="Yes, delete my account"
                handleSecondaryAction={mockFn}
                isOpen={true}
                onOpen={mockFn}
                onClose={mockFn}
            />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
