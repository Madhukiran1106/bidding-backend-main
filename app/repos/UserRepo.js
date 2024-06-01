import { Op } from 'sequelize';
import UserDB from '../models/user.js';

class UserRepo {
  constructor() {
    this.user = UserDB;
  }

  async createUser(data) {
    const result = await this.user.create(data);
    if (!result) {
      return {
        success: false,
        docExists: false
      };
    }
    return {
      success: true,
      docExists: true,
      doc: result
    };
  }

  async findByUsername(username) {
    const user = await UserDB.findOne({ where: { username: username } });
    if (!user) {
      return {
        success: false,
        docExists: false,
      };
    }
    return {
      success: true,
      docExists: true,
      doc: user,
    };
  }

  async findByEmail(email) {
    const user = await UserDB.findOne({ where: { email: email } });
    if (!user) {
      return {
        success: false,
        docExists: false,
      };
    }
    return {
      success: true,
      docExists: true,
      doc: user,
    };
  }

  async findByUsernameOrEmail(identifier) {
    // Check whether identifier is a username or email exists in the user table
    const user = await UserDB.findOne({
      where: {
        [Op.or]: [{ username: identifier }, { email: identifier }],
      },
    });

    if (!user) {
      return {
        success: false,
        docExists: false,
      };
    }

    return {
      success: true,
      docExists: true,
      doc: user,
    };
  }

  async findUserById(id){
     const user = await UserDB.findByPk(id,{
        attributes: {
          exclude: ['password', 'created_at'] // Exclude specific fields
        }
      });
     return {
        success: true,
        docExists: true,
        doc: user,
      };
  }

}

export default UserRepo;
