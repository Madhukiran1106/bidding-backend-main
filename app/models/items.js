import { DataTypes } from 'sequelize';
import postgres from '../postgres.config.js';

const ItemDB = postgres.define(
  'item',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    starting_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    current_price: {
      type: DataTypes.DECIMAL,
      defaultValue: DataTypes.DECIMAL
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false
  }
);

export default ItemDB;
