import Ajv, { JSONSchemaType } from 'ajv';
import { IUserCreate, IUserUpdate } from './IUser';



const UserCreateSchema : JSONSchemaType<IUserCreate> = {
  type: "object",
  properties: {
    email: { type: 'string' },
    challenge_id: { type: 'number' }
  },
  required: ["email"],
  additionalProperties: false,
};


const UserUpdateSchema : JSONSchemaType<IUserUpdate> = {
  type: "object",
  properties: {
    email: { type: 'string' },
    challenge_id: { type: 'number' }
  },
  required: ["email"],
  additionalProperties: false,
};

const ajv = new Ajv();
export const UserCreateValidator = ajv.compile(UserCreateSchema);
export const UserUpdateValidator = ajv.compile(UserUpdateSchema);
