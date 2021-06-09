import useSWR from 'swr';

const state = {
    load: false,
    userKey: "",
}

const userKeyFetcher = (key: string) => {
    const { data, mutate } = useSWR("", (url) => state);
    return { data, mutate }
    // state.userKey = window.sessionStorage.getItem("uid");
    // return state.userKey
}



export default userKeyFetcher;