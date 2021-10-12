import { render, screen, fireEvent } from '@testing-library/react';
import RocketDetails from './RocketDetails';

const rocketFixture = {
    rocket_id: "falcon9",
    rocket_name: "Falcon 9",
    rocket_type: "FT",
};

describe('Rocket Details Component', () => {
    
    it('should have 3 lines with labels', () => {
        const closeCallback = jest.fn();
        render(<RocketDetails {...rocketFixture} onClose={closeCallback} />);
        const label = screen.getByText('Rocket Name:');
        expect(label).toBeInTheDocument();
        const text1 = screen.getByText(rocketFixture.rocket_type);
        expect(text1).toBeInTheDocument();
        const text2 = screen.getByText(rocketFixture.rocket_name);
        expect(text2).toBeInTheDocument();
        const text3 = screen.getByText(rocketFixture.rocket_id);
        expect(text3).toBeInTheDocument();
    });

    it('should have a button', () => {
        const closeCallback = jest.fn();
        render(<RocketDetails {...rocketFixture} onClose={closeCallback} />);
        const button = screen.getAllByRole('button');
        expect(button).toHaveLength(1);
    });

    it('button click shoul call Close Callback function', () => {
        const closeCallback = jest.fn();
        render(<RocketDetails {...rocketFixture} onClose={closeCallback} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(closeCallback).toHaveBeenCalledTimes(1);
    });

});