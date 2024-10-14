"use server"

import {Query,ID
} from "node-appwrite"
import { InputFile } from 'node-appwrite/file';

import {users,
  databases,
  storage,
  DATABASE_ID,
  NEXT_PUBLIC_BUCKET_ID,
  NEXT_PUBLIC_PROJECT_ID ,
  NEXT_PUBLIC_ENDPOINT,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config"
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
    try {
      // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
      const newuser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
  
      return parseStringify(newuser);
    } catch (error: any) {
      // Check existing user
      if (error && error?.code === 409) {
        const existingUser = await users.list([
          Query.equal("email", [user.email]),
        ]);
  
        return existingUser.users[0];
      }
      console.error("An error occurred while creating a new user:", error);
    }
  };

export const getUser = async (userId : string) => {
    try{
        const user = await users.get(userId);
        return parseStringify(user);
    }catch(error) {
        console.error(
            "An error occurred while retrieving the user details:",
            error
        )
    }
}

export const registerPatient = async (
  { identificationDocument, ...patient }: RegisterUserParams,
  userId: string
) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );

      file = await storage.createFile(
        NEXT_PUBLIC_BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${NEXT_PUBLIC_BUCKET_ID}/files/${file?.$id}/view?project=${NEXT_PUBLIC_PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
