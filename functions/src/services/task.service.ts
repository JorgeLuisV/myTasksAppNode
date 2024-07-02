import {db} from "../libs/firestore";
import boom from "@hapi/boom";

import {Task, CreateTask, UpdateTask} from "../types";

export class TaskService {
  private readonly collection = "tasks";

  async findByUserID(userID: string): Promise<Task[]> {
    try {
      const querySnapshot = await db.collection(this.collection)
        .where("userID", "==", userID)
        .orderBy("createdAt", "desc")
        .get();

      const data = querySnapshot.docs.map((doc) => {
        const docData = doc.data();
        const task: Task = {
          id: doc.id,
          title: docData.title,
          completed: docData.completed,
          createdAt: docData.createdAt,
          userID: docData.userID
        }

        if (docData.description !== undefined) {
          task.description = docData.description;
        }

        return task;
      });

      return data;
    } catch (error: any) {
      throw new Error(`Error finding task by userID: ${(error as Error).message}`);
    }
  }

  async create(data: CreateTask): Promise<Task> {
    try {
      data.completed = false;
      data.createdAt = new Date();

      const docRef = await db.collection(this.collection).add(data);
      const docSnap = await docRef.get();

      const docData = docSnap.data();
      if (!docData) {
          throw new Error("Document data not found");
      }

      return {
        id: docSnap.id,
        ...docData as CreateTask
      };
    } catch (error: any) {
        throw new Error(`Error creating task: ${(error as Error).message}`);
    }
  }

  // async createWithTransaction(data: CreateTask): Promise<Task> {
  //   try {
  //     const newTask = await db.runTransaction(async (transaction) => {
  //       data.completed = false;
  //       data.createdAt = FirebaseFirestore.Timestamp.fromDate(new Date());

  //       const docRef = db.collection(this.collection).doc();
  //       transaction.set(docRef, data);

  //       const doc = await transaction.get(docRef);

  //       if (!doc.exists) {
  //           throw new Error("Failed to create task");
  //       }

  //       const docData = doc.data() as CreateTask;
  //       return {
  //           id: doc.id,
  //           title: docData.title,
  //           description: docData.description,
  //           completed: docData.completed,
  //           createdAt: docData.createdAt,
  //           userID: docData.userID
  //       };
  //     });

  //     return newTask;
  //   } catch (error: any) {
  //       throw new Error(`Error creating task: ${(error as Error).message}`);
  //   }
  // }

  async update(id: string, data: UpdateTask): Promise<Task> {
    // Obtengo el documento
    const docRef = db.collection(this.collection).doc(id);
    const docSnap = await docRef.get();

    // Valido que exista
    if (!docSnap.exists) {
      throw boom.notFound("Task not found");
    }

    // // Realizo la actualización
    await docRef.update(data);

    // Obtengo la data del documento
    const docData = docSnap.data();
    if (!docData) {
        throw new Error("Failed to retrieve existing task data");
    }

    const updatedData = {
      ...docData, // Data anterior
      ...data // Data nueva
    };

    return {
      id: docSnap.id,
      ...updatedData as CreateTask,
    };
  }

  async delete(id: string): Promise<boolean> {
    const docRef = db.collection(this.collection).doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw boom.notFound("Task not found");
    }

    await docRef.delete();

    return true;
  }
}
