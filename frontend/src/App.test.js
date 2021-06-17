import { render, screen } from '@testing-library/react';
import App from './App';

test('renders PhotoHunter', () => {
  render(<App />);
  const linkElement = screen.getByText(/PhotoHunter/i);
  expect(linkElement).toBeInTheDocument();
});
