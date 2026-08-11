// modules/watchparty/webrtc/consumer.service.js


const consumers = new Map();



/**
 * Create Consumer
 *
 * @param {
 * router,
 * producerId,
 * transport,
 * rtpCapabilities,
 * socketId
 * }
 */

exports.createConsumer =
async ({
    router,
    producerId,
    transport,
    rtpCapabilities,
    socketId
})=>{


    if(
        !router.canConsume({
            producerId,
            rtpCapabilities
        })
    ){

        throw new Error(
            "Cannot consume producer"
        );

    }



    const consumer =
        await transport.consume({

            producerId,

            rtpCapabilities,

            paused:true

        });



    consumers.set(
        consumer.id,
        {
            consumer,
            socketId
        }
    );



    consumer.on(
        "transportclose",
        ()=>{

            consumers.delete(
                consumer.id
            );

        }
    );



    consumer.on(
        "producerclose",
        ()=>{

            consumers.delete(
                consumer.id
            );

        }
    );



    return consumer;

};





/**
 * Resume Consumer
 */

exports.resumeConsumer =
async (
    consumerId
)=>{


    const data =
        consumers.get(
            consumerId
        );


    if(!data)
        throw new Error(
            "Consumer not found"
        );


    await data.consumer.resume();


    return data.consumer;

};





/**
 * Get Consumer
 */

exports.getConsumer =
(
    consumerId
)=>{


    return (
        consumers.get(
            consumerId
        )?.consumer
    ) || null;


};





/**
 * Remove Consumer
 */

exports.removeConsumer =
(
    consumerId
)=>{


    const data =
        consumers.get(
            consumerId
        );


    if(!data)
        return;


    data.consumer.close();


    consumers.delete(
        consumerId
    );

};





/**
 * Close all socket consumers
 */

exports.closeSocketConsumers =
(
    socketId
)=>{


    for(
        const [
            id,
            item
        ]
        of consumers
    ){

        if(
            item.socketId === socketId
        ){

            item.consumer.close();


            consumers.delete(
                id
            );

        }

    }

};