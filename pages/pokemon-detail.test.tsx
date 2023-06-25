import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import PokemonDetail from '@/pages/pokemon-detail';

describe('PokemonDetail', () => {
  test('renders the component', () => {
    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    // Assertion example: Check if the component is rendered
    const pokemonDetailElement = screen.getByTestId('pokemon-detail');
    expect(pokemonDetailElement).toBeInTheDocument();
  });

  test('triggers catchPokemon function when catch button is clicked', () => {
    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    // Mock the alert function
    global.alert = jest.fn();

    // Assertion example: Check if the initial alert message is not displayed
    expect(screen.queryByText('You are already owned this pokemon. Try to catch another pokemon')).toBeNull();

    // Click the catch button
    const catchButton = screen.getByText('Catch');
    fireEvent.click(catchButton);

    // Assertion example: Check if the alert function was called
    expect(global.alert).toHaveBeenCalled();
  });
});
