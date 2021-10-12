import axios from 'axios';

export type KeyValueType = {
    [key: string]: string 
};

export type SimpleCallback = (value: any) => void;

export interface IAxiosGet {
    url: string; 
    responseCallback: SimpleCallback;
    rejectCallback:SimpleCallback;
};

export const getData = ({
    url,
    responseCallback,
    rejectCallback
} : IAxiosGet) => axios.get(url).then(responseCallback).catch(rejectCallback);


export const strLower = (val: any) => String(val).toLowerCase();
