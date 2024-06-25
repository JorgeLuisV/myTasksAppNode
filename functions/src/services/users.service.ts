import {db} from "../libs/firestore";
import jwt, {Secret} from "jsonwebtoken";
import boom from "@hapi/boom";

import {CreateUser, User} from "../types";
import {config} from "../config/config";

export class UserService {
  private collection = "users";

  async findUserByEmail(email: string): Promise<User | null> {
    const querySnapshot = await db
      .collection(this.collection)
      .where("email", "==", email)
      .get();

    if (querySnapshot.empty) {
      return null;
    } else {
      const user = {
        id: querySnapshot.docs[0].id,
        email: querySnapshot.docs[0].data().email,
      };
      return user;
    }
  }

  async getUserForLogin(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }

  signToken(user: User) {
    const secret = config.jwtSecret;
    const jwtConfig = {
      expiresIn: "3d",
    };
    const payload = {
      sub: user.id,
      name: user.email,
    };

    const token = jwt.sign(payload, secret as Secret, jwtConfig);

    return {token};
  }

  async create(data: CreateUser): Promise<User> {
    const user = await this.findUserByEmail(data.email);
    if (user) {
      throw boom.unauthorized("User already exists");
    }

    const docRef = await db.collection(this.collection).add(data);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error("the document does not exist");
    }

    return {
      id: doc.id,
      email: doc.data()?.email,
    };
  }
}
