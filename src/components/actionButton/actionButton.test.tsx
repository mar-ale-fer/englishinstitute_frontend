import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {ActionButton } from './actionButton'

test('renders action button', () => {
    render(<ActionButton />);
    const buttonElement = screen.getByText(/ActionButton/i);
    expect(buttonElement).toBeInTheDocument();
  });