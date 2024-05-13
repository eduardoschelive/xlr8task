import { Tag } from "@/model/tagModel"
import { tagService } from "@/service/tagService"
import { useMutation, useQuery, useQueryClient } from "react-query"

export const useTagsQuery = () => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery('tags', tagService.getTags)

  const addTagMutation = useMutation(tagService.createTag, {
    onSuccess: () => {
      queryClient.invalidateQueries('tags')
    }
  })

  const addTag = async (tag: Tag) => {
    await addTagMutation.mutateAsync(tag)
  }

  const editTagMutation = useMutation(tagService.updateTag, {
    onSuccess: () => {
      queryClient.invalidateQueries('tags')
    }
  })

  const editTag = async (tag: Tag) => {
    await editTagMutation.mutateAsync(tag)
  }

  const removeTagMutation = useMutation(tagService.deleteTag, {
    onSuccess: () => {
      queryClient.invalidateQueries('tags')
    }
  })

  const removeTag = async (tagId: string) => {
    await removeTagMutation.mutateAsync(tagId)
  }

  return { tags: data, isLoading, addTag, editTag, removeTag }
}