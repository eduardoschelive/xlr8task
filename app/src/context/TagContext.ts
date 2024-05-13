import { Tag } from "@/model/tagModel";
import { createContext, useContext } from "react";

type TagContextType = {
  tags: Tag[] | undefined;
  addTag: (tag: Tag) => void;
  removeTag: (tagId: string) => void;
  editTag: (tag: Tag) => void;
};

export const TagContext = createContext<TagContextType | null>(null);

export const useTags = () => {
  const context = useContext(TagContext);

  if (!context) {
    throw new Error("useTags must be used within a TagProvider");
  }

  return context;
}