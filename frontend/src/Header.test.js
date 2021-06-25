import { render, screen } from '@testing-library/react';
import App from './App';
import Header from "./components/Header";

test('renders PhotoHunter', () => {
  render(<Header />);
  const headerElement = screen.getByText(/PhotoHunter/i);
  expect(headerElement).toBeInTheDocument();
});
