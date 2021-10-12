import { getData, SimpleCallback } from "./helper";

export interface ILaunches {
    records: number;
    sort: string;
    order: string;
    response: SimpleCallback;
    reject: SimpleCallback;
};

const rootAPI = 'https://api.spacexdata.com/v3/';

export const getLaunches = ({
    records,
    sort,
    order,
    response,
    reject,
} : ILaunches) => getData({ 
    url: `${rootAPI}launches?limit=${records}&offset=0&${sort}&order=${order}`, 
    responseCallback: response,
    rejectCallback: reject
});