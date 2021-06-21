import fb from '../firebase'

export const fetcherData = async (path: string) => {
    if (path == "null") {
        return undefined;
    }
    return await fb.database().ref(path).once("value").then(
        (snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            } else {
                console.log("No data available");
                return undefined;
            }
        }
    );

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