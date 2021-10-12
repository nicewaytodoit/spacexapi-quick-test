import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilter from './SearchFilter';


describe('Search Filter Component', () => {
    
    it('should have label Filter and input field', () => {
        const filterCallback = jest.fn();
        render(<SearchFilter value={'x'} onFilter={filterCallback} />);

        const label = screen.getByText('Filter:');
        expect(label).toBeInTheDocument();
        
        const input = screen.getByLabelText('search-filter-input') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input?.value).toBe('x')
    });

    it('Input change should call filterCallback function with changed Value', () => {
        const filterCallback = jest.fn();
        render(<SearchFilter value={''} onFilter={filterCallback} />);
        const input = screen.getByLabelText('search-filter-input') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        expect(input?.value).toBe('');
        const changeValue = 'Hello SpaceX';
        fireEvent.change(input, {target: { value: changeValue }});
        expect(filterCallback).toHaveBeenCalledTimes(1);
        expect(filterCallback).toHaveBeenCalledWith(changeValue);
    });

});