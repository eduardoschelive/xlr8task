import { PlusOutlined } from '@ant-design/icons'
import { Flex, FloatButton } from 'antd'
import { TagModalButton } from '../TagModalButton'
import { TaskModalButton } from '../TaskModalButton'

export const FloatButtons = () => {
  return (
    <FloatButton.Group shape='circle' trigger='hover' icon={<PlusOutlined />} type='primary'>
      <Flex gap={8} vertical>
        <TaskModalButton />
        <TagModalButton />
      </Flex>
    </FloatButton.Group>
  )
}