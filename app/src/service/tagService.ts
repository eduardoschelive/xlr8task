import { Tag } from "@/model/tagModel";
import { http } from "./http";

const endpoint = '/tags'

const getTags = async (): Promise<Tag[]> => {
  const { data } = await http.get(endpoint)
  return data;
}

const createTag = async (tag: Tag): Promise<Tag> => {
  const { data } = await http.post(endpoint, tag)
  return data
}

const updateTag = async (tag: Tag): Promise<Tag> => {
  const { data } = await http.put(`${endpoint}/${tag.uuid}`, tag)
  return data
}

const deleteTag = async (tagId: string) => {
  return http.delete(`${endpoint}/${tagId}`)
}

export const tagService = {
  getTags,
  createTag,
  updateTag,
  deleteTag
}