import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import authRoutes from './routes/auth.js';
import pageRoutes from './routes/pages.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/pages', pageRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('New user connected');

  // Join a page room
  socket.on('join-page', (pageId) => {
    socket.join(pageId);
    console.log(`User ${socket.id} joined page ${pageId}`);
  });

  // Receive page edits and broadcast to other users in the same room
  socket.on('edit-page', ({ pageId, blocks }) => {
    socket.to(pageId).emit('update-page', blocks);
  });

  socket.on('disconnect', () => console.log('User disconnected'));
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
