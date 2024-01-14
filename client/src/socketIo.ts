import { Socket, io } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from '~/types/chat'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(import.meta.env.VITE_URL, {})
export default socket
