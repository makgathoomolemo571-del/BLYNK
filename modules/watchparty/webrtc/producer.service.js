// modules/watchparty/webrtc/producer.service.js

const producers = new Map();


/**
 * Create WebRTC Producer
 * 
 * @param {Object} params
 * {
 *   socketId,
 *   transport,
 *   kind,
 *   rtpParameters
 * }
 */
exports.createProducer = async ({
    socketId,
    transport,
    kind,
    rtpParameters
}) => {

    if (!transport) {
        throw new Error(
            "Transport missing"
        );
    }


    const producer =
        await transport.produce({

            kind,

            rtpParameters

        });


    producers.set(
        producer.id,
        {
            producer,
            socketId,
            kind
        }
    );


    producer.on(
        "transportclose",
        () => {

            producers.delete(
                producer.id
            );

        }
    );


    producer.on(
        "close",
        () => {

            producers.delete(
                producer.id
            );

        }
    );


    return producer;

};



/**
 * Get Producer
 */
exports.getProducer = (
    producerId
)=>{


    const data =
        producers.get(
            producerId
        );


    return data?.producer || null;

};



/**
 * Get All Producers
 */
exports.getAllProducers = ()=>{


    return Array.from(
        producers.values()
    )
    .map(
        item =>
            item.producer
    );

};



/**
 * Remove Producer
 */
exports.removeProducer = (
    producerId
)=>{


    const data =
        producers.get(
            producerId
        );


    if(!data)
        return;


    data.producer.close();


    producers.delete(
        producerId
    );

};



/**
 * Close All Producers By Socket
 */
exports.closeSocketProducers = (
    socketId
)=>{


    for(
        const [
            id,
            item
        ]
        of producers
    ){

        if(
            item.socketId === socketId
        ){

            item.producer.close();

            producers.delete(
                id
            );

        }

    }

};