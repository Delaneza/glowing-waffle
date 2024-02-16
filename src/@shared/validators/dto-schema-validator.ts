import Joi from 'joi';

export type DataToValidate = {
  schema: Joi.ObjectSchema;
  data<T>(data: T): T;
}

export async function DtoSchemaValidator({ schema, data }: DataToValidate) {
  const { error } = schema.validate(data);

  if (error) {
    return error.details.map(detail => ({
      message: detail.message,
      path: detail.path[0],
    }));
  }

  return
}