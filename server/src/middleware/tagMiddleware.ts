import { tagSchema } from "@/model/tagModel";
import { generateValidator } from "@/utils";

export const createTagMiddleware = generateValidator({
  body: tagSchema,
});

export const updateTagMiddleware = generateValidator({
  params: tagSchema.pick({ uuid: true }).required(),
  body: tagSchema,
});

export const deleteTagMiddleware = generateValidator({
  params: tagSchema.pick({ uuid: true }).required(),
});