import { TagContext } from "@/context/TagContext";
import { useTagsQuery } from "@/hooks/useTagsQuery";
import { PropsWithChildren } from "react";

export const TagContextProvider = ({ children }: PropsWithChildren) => {

  const { addTag, editTag, removeTag, tags } = useTagsQuery();

  return (
    <TagContext.Provider value={{ tags, addTag, removeTag, editTag }}>
      {children}
    </TagContext.Provider>
  );
}