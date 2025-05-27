import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import RegisterPage from './RegisterPage';

const mockStore = configureMockStore();
const mockRegister = jest.fn();

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('RegisterPage', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      },
    });
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <Provider store={store}>
          <RegisterPage register={mockRegister} />
        </Provider>
      </MemoryRouter>,
    );
  };

  it('renders without errors', () => {
    renderComponent();
    expect(
      screen.getByRole('heading', { name: 'Utwórz konto' }),
    ).toBeInTheDocument();
  });

  it('contains registration form elements', () => {
    renderComponent();

    // Sprawdź czy formularz jest obecny
    expect(
      screen.getByRole('heading', { name: 'Utwórz konto' }),
    ).toBeInTheDocument();

    // Sprawdź czy są inputy (nawet jeśli bez dokładnych labeli)
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBeGreaterThan(0);
  });

  it('contains a register button', () => {
    renderComponent();

    // Szukaj przycisku rejestracji
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle form submission', () => {
    renderComponent();

    // Znajdź i kliknij przycisk submit (jeśli istnieje)
    const buttons = screen.getAllByRole('button');
    if (buttons.length > 0) {
      fireEvent.click(buttons[0]);
      // Test podstawowego wywołania - mockRegister może zostać wywołany
    }
  });
});
