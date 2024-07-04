import {db} from "../libs/firestore";
import jwt, {Secret} from "jsonwebtoken";
import boom from "@hapi/boom";

import {CreateUser, TokenResponse, User} from "../types";
import {config} from "../config/config";

export class UserService {
  private readonly collection = "users";

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const querySnapshot = await db
        .collection(this.collection)
        .where("email", "==", email)
        .get();

      if (querySnapshot.empty) {
        return null;
      } else {
        return {
          id: querySnapshot.docs[0].id,
          email: querySnapshot.docs[0].data().email,
        };
      }
    } catch (error) {
      throw new Error(
        `Error finding user by email: ${(error as Error).message}`
      );
    }
  }

  async getUserForLogin(email: string): Promise<User> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    return user;
  }

  signToken(user: User): TokenResponse {
    const secret = config.jwtSecret as Secret;
    const jwtConfig = {
      expiresIn: "3d",
    };
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, jwtConfig);

    return {token};
  }

  async create(data: CreateUser): Promise<User> {
    const user = await this.findUserByEmail(data.email);
    if (user) {
      throw boom.unauthorized("User already exists");
    }

    try {
      const newUser = await db.runTransaction(async (transaction) => {
        const userSnapshot = await transaction
          .get(db.collection(this.collection)
            .where("email", "==", data.email));

        if (!userSnapshot.empty) {
          throw boom.unauthorized("User already exists");
        }

        const docRef = db.collection(this.collection).doc();
        transaction.set(docRef, data);

        return {
          id: docRef.id,
          email: data.email,
        };
      });

      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${(error as Error).message}`);
    }
  }
}
