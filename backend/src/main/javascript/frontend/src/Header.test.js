import {render, screen} from '@testing-library/react';
import Header from "./components/Header";
import AuthProvider from "./context/AuthProvider";

test('renders PhotoHunter', () => {

    render(<AuthProvider authorities={[]}>
        <Header/>
    </AuthProvider>);
    const headerElement = screen.getByText(/PhotoHunter/i);
    expect(headerElement).toBeInTheDocument();
});
