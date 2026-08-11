// modules/watchparty/sockets/watchparty.socket.js

const {
    joinRoom,
    leaveRoom,
    getRoomUsers,
    addProducer,
    removeProducer,
    getProducer,
    addConsumer,
    removeConsumer
} = require("../signaling/signaling.events");


const {
    createProducer,
    createConsumer
} = require("../webrtc");


const {
    createWebRtcTransport
} = require("../mediasoup/transport");


module.exports = function watchPartySocket(io) {


    io.on("connection", (socket)=>{


        console.log(
            "WATCHPARTY SOCKET CONNECTED:",
            socket.id
        );



        /*
        ===============================
        JOIN WATCH PARTY
        ===============================
        */


        socket.on(
            "watchparty:join",
            async({watchPartyId,user})=>{


                socket.join(
                    watchPartyId
                );


                joinRoom(
                    watchPartyId,
                    socket.id,
                    user
                );


                const users =
                    getRoomUsers(
                        watchPartyId
                    );


                io.to(
                    watchPartyId
                ).emit(
                    "watchparty:participants",
                    users
                );


                io.to(
                    watchPartyId
                ).emit(
                    "watchparty:viewers",
                    users.length
                );


            }
        );




        /*
        ===============================
        CREATE PRODUCER TRANSPORT
        ===============================
        */


        socket.on(
            "watchparty:createTransport",
            async({watchPartyId,type},callback)=>{


                try{


                    const transport =
                        await createWebRtcTransport(
                            watchPartyId
                        );


                    socket.transport =
                        transport;



                    callback({

                        id: transport.id,

                        iceParameters:
                            transport.iceParameters,

                        iceCandidates:
                            transport.iceCandidates,

                        dtlsParameters:
                            transport.dtlsParameters

                    });


                }
                catch(err){

                    console.log(err);

                    callback({
                        error:
                        err.message
                    });

                }


            }
        );




        /*
        ===============================
        CONNECT TRANSPORT
        ===============================
        */


        socket.on(
            "watchparty:connectTransport",
            async(data,callback)=>{


                try{


                    await socket.transport.connect({

                        dtlsParameters:
                        data.dtlsParameters

                    });


                    callback({
                        connected:true
                    });


                }
                catch(err){


                    callback({
                        error:
                        err.message
                    });


                }


            }
        );





        /*
        ===============================
        PRODUCE VIDEO/AUDIO
        ===============================
        */


        socket.on(
            "watchparty:produce",
            async(data,callback)=>{


                try{


                    const producer =
                    await createProducer({

                        transport:
                        socket.transport,

                        kind:
                        data.kind,

                        rtpParameters:
                        data.rtpParameters

                    });



                    addProducer(

                        data.watchPartyId,

                        producer

                    );



                    socket
                    .to(
                        data.watchPartyId
                    )
                    .emit(

                        "watchparty:newProducer",

                        {
                            producerId:
                            producer.id,

                            kind:
                            producer.kind

                        }

                    );



                    callback({

                        id:
                        producer.id

                    });


                }
                catch(err){

                    console.log(err);

                    callback({
                        error:
                        err.message
                    });

                }


            }
        );






        /*
        ===============================
        CONSUME STREAM
        ===============================
        */


        socket.on(
            "watchparty:consume",
            async(data,callback)=>{


                try{


                    const producer =
                    getProducer(
                        data.watchPartyId,
                        data.producerId
                    );



                    const consumer =
                    await createConsumer({

                        transport:
                        socket.transport,

                        producer,

                        rtpCapabilities:
                        data.rtpCapabilities

                    });



                    addConsumer(

                        data.watchPartyId,

                        consumer

                    );



                    callback({

                        id:
                        consumer.id,

                        producerId:
                        producer.id,

                        kind:
                        consumer.kind,

                        rtpParameters:
                        consumer.rtpParameters

                    });


                }
                catch(err){

                    console.log(err);

                    callback({
                        error:
                        err.message
                    });

                }


            }
        );






        /*
        ===============================
        CHAT
        ===============================
        */


        socket.on(
            "watchparty:chat",
            ({watchPartyId,message,user})=>{


                io.to(
                    watchPartyId
                )
                .emit(

                    "watchparty:chat",

                    {

                        user,

                        message,

                        time:
                        new Date()

                    }

                );


            }
        );






        /*
        ===============================
        LEAVE
        ===============================
        */


        socket.on(
            "watchparty:leave",
            ({watchPartyId})=>{


                socket.leave(
                    watchPartyId
                );


                leaveRoom(

                    watchPartyId,

                    socket.id

                );


                const users =
                getRoomUsers(
                    watchPartyId
                );



                io.to(
                    watchPartyId
                )
                .emit(

                    "watchparty:viewers",

                    users.length

                );


            }
        );






        /*
        ===============================
        DISCONNECT
        ===============================
        */


        socket.on(
            "disconnect",
            ()=>{


                console.log(
                    "WATCHPARTY SOCKET CLOSED:",
                    socket.id
                );


            }
        );



    });


};