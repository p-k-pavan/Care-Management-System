import * as sdk from 'node-appwrite'

export const NEXT_PUBLIC_PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const NEXT_PUBLIC_ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
export const DATABASE_ID = process.env.DATABASE_ID;
export const PATIENT_COLLECTION_ID = process.env.PATIENT_COLLECTION_ID;
export const DOCTOR_COLLECTION_ID = process.env.DOCTOR_COLLECTION_ID;
export const APPOINTMENT_COLLECTION_ID = process.env.APPOINTMENT_COLLECTION_ID;
export const NEXT_PUBLIC_BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;

const client = new sdk.Client();

client
  .setEndpoint(NEXT_PUBLIC_ENDPOINT!)
  .setProject(NEXT_PUBLIC_PROJECT_ID!)
  .setKey(NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);