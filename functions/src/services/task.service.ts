import {db} from "../libs/firestore";
import boom from "@hapi/boom";

import {CreateTask, UpdateTask} from "../types";

export class TaskService {
  private collection = "tasks";

  async findByUserID(userID: string) {
    const querySnapshot = await db.collection(this.collection)
      .where("userID", "==", userID)
      .orderBy("createdAt", "desc")
      .get();

    const data = querySnapshot.docs.map((doc) => {
      const docData = doc.data();

      return {
        id: doc.id,
        ...docData,
      };
    });

    return data;
  }

  async create(data: CreateTask) {
    data.completed = false;
    data.createdAt = new Date();

    const docRef = await db.collection(this.collection).add(data);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async update(id: string, data: UpdateTask) {
    const docRef = db.collection(this.collection).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw boom.notFound("Task not found");
    }

    const updateData: { [key: string]: any } = {...data};
    await docRef.update(updateData);
    const doc = await docRef.get();

    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async delete(id: string) {
    const docRef = db.collection(this.collection).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw boom.notFound("Task not found");
    }

    await docRef.delete();

    return true;
  }
}
