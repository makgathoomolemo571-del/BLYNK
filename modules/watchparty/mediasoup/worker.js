// modules/watchparty/mediasoup/worker.js

const mediasoup = require("mediasoup");

let worker;


async function createWorker() {

    if (worker) {
        return worker;
    }


    worker = await mediasoup.createWorker({

        rtcMinPort: 40000,

        rtcMaxPort: 49999

    });


    console.log(
        "MEDIASOUP WORKER CREATED:",
        worker.pid
    );


    worker.on(
        "died",
        () => {

            console.error(
                "MEDIASOUP WORKER DIED"
            );

            process.exit(1);

        }
    );


    return worker;

}



module.exports = {
    createWorker
};