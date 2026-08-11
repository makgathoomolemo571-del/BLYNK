// modules/watchparty/webrtc/webrtc.service.js

class WebRTCService {
  constructor() {
    this.rooms = new Map();
  }

  createRoom(roomId) {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        peers: new Map(),
        createdAt: new Date()
      });
    }

    return this.rooms.get(roomId);
  }

  getRoom(roomId) {
    return this.rooms.get(roomId) || null;
  }

  removeRoom(roomId) {
    this.rooms.delete(roomId);
  }

  joinRoom(roomId, peer) {
    const room = this.createRoom(roomId);

    room.peers.set(peer.id, peer);

    return room;
  }

  leaveRoom(roomId, peerId) {
    const room = this.rooms.get(roomId);

    if (!room) return;

    room.peers.delete(peerId);

    if (room.peers.size === 0) {
      this.rooms.delete(roomId);
    }
  }

  getPeers(roomId) {
    const room = this.rooms.get(roomId);

    if (!room) return [];

    return [...room.peers.values()];
  }
}

module.exports = new WebRTCService();