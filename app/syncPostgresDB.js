import BidsDB from "./models/bids.js";
import ItemDB from "./models/items.js";
import notificationDB from "./models/notifications.js";
import UserDB from "./models/user.js";

/**
 * Since we are using sequelize we need to sync the model schemas
 * to the database before we can use the database ,since it will check
 * and create tables in the database.
 */
const synchornizePSQLModels = async () => {
  console.log('🚀 Migration has started...');
  console.log('⚙️ Synchornizing models...');
  console.log("📦 Creating Tables in the Database...");
  await UserDB.sync();
  await BidsDB.sync();
  await ItemDB.sync();
  await notificationDB.sync();
  console.log("✅ Schema migration completed and Tables created are User,Bids,Items,Notification!");
};

export default synchornizePSQLModels;