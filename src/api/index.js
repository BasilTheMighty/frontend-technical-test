/**
 * This is an example request. Create your own using best practises for
 * handling asynchronous data fetching
 **/

//TODO http://localhost:9988 as config
const baseUrl = `http://localhost:9988`;

const getData = (cb) => {
    fetch(`${baseUrl}/api/vehicle`)
        .then((response) => response.json())
        .then((json) => {
            cb({error: false, data: json});
        })
        .catch((err) => {
            cb({error: err, data: null});
        });
};

const getVehicle = (url, cb) => {
    fetch(`${baseUrl}${url}`)
        .then((response) => response.json())
        .then((json) => {
            cb({error: false, data: json});
        })
        .catch((err) => {
            cb({error: err, data: null});
        });
};

export {getData, getVehicle}