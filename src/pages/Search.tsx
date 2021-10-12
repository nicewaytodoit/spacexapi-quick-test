/* window */
import moment from 'moment';
import { useState, useEffect, useCallback } from 'react';
import { getLaunches } from '../services/services';
import { SearchFilter } from './components';
import Rocket, { IRocket } from './components/RocketDetails/RocketDetails';

import './Search.css';

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [emptySearch, setEmptySearch] = useState(false);
    const [list, setList] = useState<any[]>([]);
    const [rocketDetails, setRocketDetails] = useState<null|IRocket>(null);
    const [sortBy, setSortBy] = useState('launch_date_utc');
    const resultList = useCallback(() => {
        return list
        .filter((launch) => String(launch.mission_name).toLowerCase().indexOf((searchTerm||'').toLowerCase()) > -1)
        .sort(
                (sortBy === 'launch_date_utc') ? 
                    (a, b) => (`${b[sortBy]}`).localeCompare(a[sortBy]) :
                    (a, b) => (`${a[sortBy]}`).localeCompare(b[sortBy]));
    }, [list, sortBy, searchTerm]);

    useEffect(() => {
        filterData(searchTerm);
    }, []);


    const filterData = (search: string) => {
        setLoading(true);
        setEmptySearch(false);
        getLaunches({
            records: 50,
            sort: 'flight_number',
            order: 'desc',
            response: (response) => {
                setLoading(false);
                // console.log(response);
                const results = response?.data || {};
                setEmptySearch(results?.length === 0);
                setList((prev) => [...prev, ...results]);
            }, 
            reject: (error : any) => {
                setLoading(false);
                setError(error);
            }
        });
    };

    const rocketDetailsClickHandler = (rocket: IRocket) => {
        setRocketDetails(rocket);
    };

    const rocketCloseHandler = () => {
        setRocketDetails(null);
    };

    const filterHandler = (val: string) => {
        setSearchTerm(val);
    };

    return (
        <div className="search">
            <div className="search__container">

                <SearchFilter value={searchTerm} onFilter={filterHandler} />

                <div className="search__sort" aria-label="search-sort">
                    <label>Sort by: </label>
                    <input type="radio" id="date" name="launchessort" checked={sortBy === 'launch_date_utc'} value={'launch_date_utc'} onClick={() => setSortBy('launch_date_utc')} onChange={()=>{}} />
                    <label htmlFor="date">Date</label>
                    <input type="radio" id="name" name="launchessort" checked={sortBy === 'mission_name'} value={'mission_name'} onClick={() => setSortBy('mission_name')}  onChange={()=>{}} />
                    <label htmlFor="name">Lanuch name</label>
                </div>
                
                {!!error && <div className="search__event-error">There was an error while fetching data...</div>}
                {!!emptySearch && <div className="search__event-empty">Sorry my love but there are no result for what you lookin for!</div>}
                {!!rocketDetails && <Rocket {...rocketDetails} onClose={rocketCloseHandler} />}
                <ul className="search__result" aria-label="search-result">
                    {(resultList() || []).map((obj: any, index: number) => { 
                        return (
                        <li 
                            className="search__result__line" 
                            key={`${obj?.flight_number}-${index}`}
                        >
                            <span><span>Date:</span> {moment(obj?.launch_date_utc).format('DD MMM YYYY HH:mm')}</span>
                            <span><span>Launch Name:</span> {obj?.mission_name}</span>
                            <button type="button" title="View Rocket Details" onClick={() => rocketDetailsClickHandler(obj?.rocket)}>View Rocket Details</button>
                        </li>
                    )})}
                </ul>
                {!!loading && <div className="search__event-load">Loading items...</div>}
            </div>
        </div>
    );
};

export default Search;
