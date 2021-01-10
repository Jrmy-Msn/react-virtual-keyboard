import { render, screen } from '@testing-library/react';
import VirtualKeyboard from './VirtualKeyboard';

test('renders learn react link', () => {
  render(<VirtualKeyboard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
