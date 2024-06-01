import UserRepo from '../repos/UserRepo.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../configs/config.js';

const userRepo = new UserRepo();

class UserService {
  #signJWT(data) {
    const token = jwt.sign(data,config.jwtSecretKey);
    if (!token) {
      throw new Error('JWT secret key not found in environment variables');
    }
    return token;
  }

  async registerUser(data) {
    const {username ,email} = data;
    const usernameExists = await userRepo.findByUsername(username);
    if(usernameExists.success){
        return {
          statusCode: 203,
          resSend: {
            message: 'User already exists by this username!',
            status: '0'
          }
        };
    }
    const emailExists = await userRepo.findByEmail(email);
    if(emailExists.success){
        return {
          statusCode: 202,
          resSend: {
            message: 'User already exists by this username!',
            status: '-1'
          }
        };
    }
    const { password } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userdata = {
      ...data,
      password: hashedPassword
    };
    const user = await userRepo.createUser(userdata);
    return {
      statusCode: 201,
      resSend: {
        message: 'User Registered!',
        status: '1',
        data: user.doc
      }
    };
  }

  async loginUser(credentials) {
    const { username, password } = credentials;
    const userExists = await userRepo.findByUsernameOrEmail(username);
    if (!userExists.success) {
      return {
        statusCode: 201,
        resSend: {
          message: 'User not Found!',
          status: '0'
        }
      };
    }
    const passwordMatched = await bcrypt.compare(
      password,
      userExists.doc.password
    );
    if (!passwordMatched) {
      return {
        statusCode: 202,
        resSend: {
          message: 'Invalid Password',
          status: '-1'
        }
      };
    }
    const token = this.#signJWT({ id: userExists.doc.id, username: username });
    return {
      statusCode: 200,
      resSend: {
        message: 'User LoggedIn',
        status: '1',
        data: userExists.doc,
        authToken: token,
      }
    };
  }

  async getProfile(userId){
    const user = await userRepo.findUserById(userId);
    return {
        statusCode: 200,
        resSend: {
          message: 'User Profile',
          status: '1',
          data: user.doc
        }
    }
  }

}

export default UserService;