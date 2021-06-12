import fb from '../firebase'

export const fetcherData = async (path: string) => {
    return await fb.database().ref(path).get()
        .then((data) => {
            if (data.exists()) {
                return data.val();
            } else {
                console.log("No data available");
            }
        })
        .catch((err) => {
            return err
        })

}

export const fetcherStorage = async (path: string) => {

    const storageRef = fb.storage().ref();

    let arr = [];
    await storageRef.child(path).listAll()
        .then((res) => {
            return res.items;
        })
        .then(async (items) => {
            for (let i of items) {
                await i.getDownloadURL().then((url) => {
                    arr.push(url)
                })
            }

            //문제의 코드
            // items.forEach((item) => {
            //     item.getDownloadURL().then((url) => {
            //         arr.push(url);
            //     })
            // })

        })
        .catch((err) => {
            console.log(err);
        })

    return arr;

}