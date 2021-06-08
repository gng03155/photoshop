import fb from '../firebase'

const fetcher = async (path: string) => {

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

export default fetcher