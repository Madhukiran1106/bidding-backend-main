/* eslint-disable no-process-exit */
/* eslint-disable security-node/detect-crlf */
import app from './app/app.js';
import { config, psqlConfig } from './app/configs/config.js';
import postgres from './app/postgres.config.js';
import synchornizePSQLModels from './app/syncPostgresDB.js';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import verifyToken from './app/utils/utils.js';
import BidsService from './app/services/BidsService.js';
import NotificationService from './app/services/NotificationService.js';

const BidingService = new BidsService();
const notificationService = new NotificationService();

const serverHttp = createServer(app);
const io = new Server(serverHttp);

console.log(`🚀 ${config.nodeEnv}-mode`);
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception! 🛑 Stopping server..');
  console.log(err);
  process.exit(1);
});

const server = serverHttp.listen(config.port, () => {
  postgres
    .authenticate()
    .then(() => {
      console.log('✅ Connection has been established successfully');
      console.log(`📦 Database connected --> ${psqlConfig.DB}`);
    })
    .catch((err) => {
      console.error('❌ Unable to connect to the database:', err);
    });
  synchornizePSQLModels()
    .then(() => {
      console.log('✅ Models Synchronized to Database!');
    })
    .catch((err) => console.error('❌ Failed to Synchronize Models', err));
  console.log(`🔴🟢🟡 Server running at http://localhost:${config.port}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  if (socket.handshake.query && socket.handshake.query.token) {
    var user = verifyToken(socket.handshake.query.token);
  }
  socket.on('bid', async (data) => {
    const result = await BidingService.ioPlaceBidOnItem(
      user.id,
      data.item_Id,
      data.bid_amount
    );
    if (result.success) {
      io.emit('update', result.message);
      io.emit('bid', 'Your bid has been updated!');
      const notifies =  await notificationService.ioNotifyTheLastNBids(5);
      if(notifies.success){
        io.emit("notify",notifies.bids)
      }
      else{
        io.emit("notify","No Bids Placed Yet!")
      }
    } else {
      io.emit('bid', result.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

//  Unhandled promise rejection errors
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! 🛑 Stopping server..');
  console.log(`${err.name} ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
