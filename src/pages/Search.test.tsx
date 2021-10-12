import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';
import * as api from '../services/services';
import { getLaunches } from '../services/services';
import { data } from './launches.fixture';

jest.mock("../services/services");

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

    it('should have list elements after render', async () => {
        render(<Search />);
        const list = await screen.findByRole('list');
        expect(list).toBeInTheDocument();
    }); 

    // const apiProps = {
    //     "order": "desc",
    //     "records": 50,
    //     "reject": responseCallback, 
    //     "response": rejectCallback,
    //     "sort": "flight_number"
    // };
    it('should have li elements and correct data after API call & render', async () => {
        const launches = data;

        (getLaunches as jest.Mock).mockImplementation(({
            records,
            sort,
            order,
            response,
            reject,
        }) => response({data: launches}));

        render(<Search />);
        // expect(screen.getByText("Loading items...")).toBeInTheDocument();
        const list = await screen.findByRole('list');
        expect(list).toBeInTheDocument();

        expect(getLaunches).toHaveBeenCalledTimes(1);
        expect(getLaunches).toHaveBeenCalledWith(expect.anything());
        
        await waitFor(() => expect(screen.getByLabelText("result-title")).toBeInTheDocument());
    
        const { getAllByRole } = within(list);
        const listitems = getAllByRole('listitem');
        expect(listitems).toHaveLength(50);

        launches.forEach((launch) => expect(screen.getByText(launch?.mission_name)).toBeInTheDocument());
    });

    it('should show data set size change on filter field change', async () => {
        const launches = data;

        (getLaunches as jest.Mock).mockImplementation(({
            records,
            sort,
            order,
            response,
            reject,
        }) => response({data: launches}));

        render(<Search />);

        expect(getLaunches).toHaveBeenCalledTimes(1);
        await waitFor(() => expect(screen.getByLabelText("result-title")).toBeInTheDocument());

        const input = screen.getByLabelText('search-filter-input') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input?.value).toBe('');
        const changeValue = 'crew';
        fireEvent.change(input, {target: { value: changeValue }});
        
        const list = await screen.findByRole('list');

        const { getAllByRole } = within(list);
        const listitems = getAllByRole('listitem');
        expect(listitems).toHaveLength(2);
    });

});


