import { render, screen, within, fireEvent } from '@testing-library/react';
import Search from './Search';
import * as api from '../services/services';

// jest.mock("./api/launches");

describe('Search Main Page', () => {
    
    it('should have Filter, Sort and Result sections', () => {
        const screen = render(<Search />);
        // screen.debug();
        const section1 = screen.getByLabelText('search-filter');
        const section2 = screen.getByLabelText('search-sort');
        const section3 = screen.getByLabelText('search-result');

        expect(section1).toBeInTheDocument();
        expect(section2).toBeInTheDocument();
        expect(section3).toBeInTheDocument();
    });

    it('should have API call made after render', () => {
        const spy = jest.spyOn(api, 'getLaunches');
        render(<Search />);
        // screen.debug();
        expect(spy).toBeCalledTimes(1);
    }); 

    it('should have li elements after render', async () => {
        render(<Search />);
        const list = await screen.findByRole('list');
        expect(list).toBeInTheDocument();
        // const { getAllByRole } = within(list);
        // const listitems = getAllByRole('listitem');
        // expect(listitems).toHaveLength(50);
    }); 

});