import useSWR from 'swr'

const loadFetcher = (key: string) => {

    const state = {
        load: false,
        userKey: "",
    }

    return state[key];

}

export default loadFetcher;