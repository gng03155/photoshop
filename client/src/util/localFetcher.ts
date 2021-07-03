
export const init = {
    load: false,
    userKey: "asd",
}

export const setInit = (key, data) => {
    init[key] = data;
}


export const localFetcher = (key: string) => {

    const state = {
        load: init.load,
        userKey: init.userKey,
    }

    if (!Object.keys(state).includes(key)) {
        return console.error("해당하는 key값이 존재하지 않습니다. localFecther 09")
    }

    init[key] = state[key];

    console.log(init);

    return state[key];

}