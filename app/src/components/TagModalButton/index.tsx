import { useTags } from "@/context/TagContext";
import { Tag } from "@/model/tagModel";
import { DeleteOutlined, EditOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Flex, FloatButton, List, Modal } from "antd";
import { useState } from "react";
import { TagEditModal } from "../TagEditModal";

export const TagModalButton = () => {
  const [isOpen, setIsTagsModalOpen] = useState(false)

  const { tags, removeTag, addTag, editTag } = useTags()

  const showTagsModal = () => {
    setIsTagsModalOpen(true)
  }

  const hideTagsModal = () => {
    setIsTagsModalOpen(false)
  }

  const renderHeader = () => {
    return (
      <Flex align="center" justify="end">
        <TagEditModal onSave={addTag} title="Criar nova tag" formName="create-tag">
          <Button type="primary">Adicionar tag</Button>
        </TagEditModal>
      </Flex>
    )
  }

  const renderEditButton = (tag: Tag) => {
    return (
      <TagEditModal onSave={editTag} tag={tag} title={`Editando a tag ${tag.name}`} formName={`edit-tag-${tag.uuid}`}>
        <Button shape="circle" type="primary" icon={<EditOutlined />} />
      </TagEditModal>
    )
  }

  const renderListItem = (tag: Tag) => (
    <List.Item key={tag.uuid}>
      <Flex justify="space-between" align="center" gap={24} style={{ width: "100%" }}>
        <span>{tag.name}</span>
        <Flex gap={8}>
          {renderEditButton(tag)}
          <Button shape="circle" danger type="primary" icon={<DeleteOutlined />} onClick={() => removeTag(tag.uuid!)} />
        </Flex>
      </Flex>
    </List.Item>
  );
  
  return (
    <>
      <Modal title="Edição de tags" onCancel={hideTagsModal} open={isOpen} okText="Concluído" onOk={hideTagsModal}>
        <Flex vertical gap={8}>
          <List
            header={renderHeader()}
            style={{ width: "100%" }}
            dataSource={tags}
            renderItem={renderListItem}
          />
        </Flex>
      </Modal>
      <FloatButton icon={<TagsOutlined />} onClick={showTagsModal} tooltip="Edição de tags" />
    </>
  )
}