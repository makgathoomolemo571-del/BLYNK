// modules/watchparty/mediasoup/router.js


const {
    createWorker
} = require("./worker");


let router;



const mediaCodecs = [

    {
        kind: "audio",

        mimeType:
        "audio/opus",

        clockRate:48000,

        channels:2
    },


    {
        kind:"video",

        mimeType:
        "video/VP8",

        clockRate:90000,

        parameters:{}

    }

];



async function createRouter(){

    if(router){
        return router;
    }


    const worker =
        await createWorker();



    router =
    await worker.createRouter({

        mediaCodecs

    });


    console.log(
        "MEDIASOUP ROUTER CREATED"
    );


    return router;

}



async function getRouter(){

    if(!router){

        return createRouter();

    }


    return router;

}



module.exports = {

    createRouter,

    getRouter

};