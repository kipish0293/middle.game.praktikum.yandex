/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Modal } from './Modal';

const title = 'Test Modal';
const body = 'Test body content';

function createModal(onClose: () => void, isOpen = true) {
  return render(<Modal onClose={onClose} isOpen={isOpen} size="lg" body={body} title={title} />);
}

test('opens the modal when isOpen is true', () => {
  const onClose = jest.fn();
  createModal(onClose);

  const modalTitle = screen.getByText('Test Modal');
  const modalBody = screen.getByText('Test body content');

  expect(modalTitle).toBeInTheDocument();
  expect(modalBody).toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn();
  createModal(onClose);
  const closeButton = screen.getByTestId('modal-close-btn');

  fireEvent.click(closeButton);

  expect(onClose).toHaveBeenCalled();
});

describe('Modal component with expected structure', () => {
  it('renders the Modal component with content', () => {
    const onClose = jest.fn();

    createModal(onClose);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
  it('renders the Modal component with header', () => {
    const onClose = jest.fn();

    createModal(onClose);

    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
  });
  it('renders the Modal component with close button', () => {
    const onClose = jest.fn();

    createModal(onClose);

    expect(screen.getByTestId('modal-close-btn')).toBeInTheDocument();
  });
  it('renders the Modal component with body', () => {
    const onClose = jest.fn();

    createModal(onClose);

    expect(screen.getByTestId('modal-body')).toBeInTheDocument();
  });
});
