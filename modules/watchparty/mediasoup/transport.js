// modules/watchparty/mediasoup/transport.js


const {
    getRouter
} = require("./router");




async function createWebRtcTransport(){


    const router =
        await getRouter();



    const transport =
    await router.createWebRtcTransport({

        listenIps:[

            {
                ip:"0.0.0.0",

                announcedIp:
                process.env.SERVER_IP || null
            }

        ],


        enableUdp:true,

        enableTcp:true,

        preferUdp:true


    });



    console.log(
        "WEBRTC TRANSPORT CREATED:",
        transport.id
    );



    return transport;

}




module.exports = {

    createWebRtcTransport

};