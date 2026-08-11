// modules/watchparty/webrtc/peer.service.js

class PeerService {
  constructor() {
    this.peers = new Map();
  }

  create(socketId, userId) {
    const peer = {
      id: socketId,
      userId,

      producerTransport: null,
      consumerTransport: null,

      producers: [],
      consumers: [],

      joinedAt: new Date()
    };

    this.peers.set(socketId, peer);

    return peer;
  }

  get(socketId) {
    return this.peers.get(socketId) || null;
  }

  remove(socketId) {
    this.peers.delete(socketId);
  }

  setProducerTransport(socketId, transport) {
    const peer = this.get(socketId);

    if (!peer) return null;

    peer.producerTransport = transport;

    return peer;
  }

  setConsumerTransport(socketId, transport) {
    const peer = this.get(socketId);

    if (!peer) return null;

    peer.consumerTransport = transport;

    return peer;
  }

  addProducer(socketId, producer) {
    const peer = this.get(socketId);

    if (!peer) return;

    peer.producers.push(producer);
  }

  addConsumer(socketId, consumer) {
    const peer = this.get(socketId);

    if (!peer) return;

    peer.consumers.push(consumer);
  }

  clear(socketId) {
    const peer = this.get(socketId);

    if (!peer) return;

    for (const producer of peer.producers) {
      producer.close?.();
    }

    for (const consumer of peer.consumers) {
      consumer.close?.();
    }

    peer.producerTransport?.close?.();
    peer.consumerTransport?.close?.();

    this.remove(socketId);
  }
}

module.exports = new PeerService();