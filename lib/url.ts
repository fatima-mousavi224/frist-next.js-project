
import qs from "query-string";

interface urlQueryPrams {
    params: string,
    key: string,
    value: string   
}

interface urlQueryRemovePrams {
    params: string,
    keyToRemove: string[],
}

export const formUrlQuery = ({params, key , value}: urlQueryPrams) => {
    const queryString = qs.parse(params);

    queryString[key] = value;
    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString
    })
}
export const removeKrysFormQuery = ({params, keyToRemove}: urlQueryRemovePrams) => {
    const queryString = qs.parse(params);

    keyToRemove.forEach((Key) => {
        delete queryString[Key];
    })

    return qs.stringifyUrl({
        url: window.location.pathname,
        query: queryString
    },
{
    skipNull: true,
})
}

