import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import { useGetAllOrders } from '../../api/getAllOrders.api';
import Orders from '../../components/Orders'; // Adjust the path as necessary

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../../api/getAllOrders.api');

const mockOrders = [
    'order1',
    'order2'
];

beforeEach(() => {
    // @ts-ignore
    useGetAllOrders.mockReturnValue({
        data: mockOrders,
        isFetching: false,
    });
});

test('renders orders correctly and navigates on click', () => {
    const mockNavigate = jest.fn();
    // @ts-ignore
    useNavigate.mockReturnValue(mockNavigate);

    render(<Orders />);

    // Check if the orders are rendered
    mockOrders.forEach((_, index) => {
        const orderRow = screen.getByTestId(`order_id_${index}`);
        expect(orderRow).toBeInTheDocument();
        expect(screen.getByText(`Order ${index + 1}`)).toBeInTheDocument();
    });

    // Simulate click on the first order
    const firstOrderRow = screen.getByTestId('order_id_0');
    fireEvent.click(firstOrderRow);

    // Check if navigate is called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith("/details", { state: { id: '1' } });
});
