import { render, screen } from '@testing-library/react';
import App from './App';
import Header from "./components/Header";

test('renders PhotoHunter', () => {
  render(<Header />);
  const linkElement = screen.getByText(/PhotoHunter/i);
  expect(linkElement).toBeInTheDocument();
});
