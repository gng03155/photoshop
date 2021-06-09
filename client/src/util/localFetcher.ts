const localFetcher = (key: string) => {

    const state = {
        load: false,
        userKey: "",
    }

    if (!Object.keys(state).includes(key)) {
        return console.error("해당하는 key값이 존재하지 않습니다. localFecther 09")
    }

    return state[key];

}

export default localFetcher;