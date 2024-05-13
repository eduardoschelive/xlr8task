import { createKey, dynamoDB, dynamoPrimaryKey, dynamoString, extractPrimaryKey, generateDynamoPrimaryKey, tableName } from '@/lib'
import { Task } from '@/model'
import { AppError } from '@/utils'
import {
  AttributeValue,
  DeleteItemCommandInput,
  GetItemCommandInput,
  PutItemCommandInput,
  QueryCommandInput,
  UpdateItemCommandInput
} from '@aws-sdk/client-dynamodb'
import { EntityEnum, SortKeyEnum } from './entityEnum'
import { clearTaskTags, replaceTaskTags, validateTags } from './tagDatabase'

const taskMappeer = (item: Record<string, AttributeValue>, tags?: string[]): Partial<Task> => ({
  uuid: extractPrimaryKey(item.uniqueId.S!).uuid,
  title: item.title.S,
  startDate: item.startDate.S,
  endDate: item.endDate.S,
  description: item.description?.S,
  tags
})

export const existsTask = async (uuid: string): Promise<boolean> => {
  const params: GetItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Task, uuid, SortKeyEnum.Task),
  }

  const { Item } = await dynamoDB.getItem(params)
  return !!Item
}

export const createTask = async (task: Task): Promise<Partial<Task>> => {
  const newTask = {
    uniqueId: dynamoString(generateDynamoPrimaryKey(EntityEnum.Task)),
    sortKey: dynamoString(SortKeyEnum.Task),
    title: dynamoString(task.title),
    startDate: dynamoString(task.startDate),
    endDate: dynamoString(task.endDate),
    description: dynamoString(task.description),
  }

  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: newTask,
  }

  if (task.tags) {
    await validateTags(task.tags)
    await replaceTaskTags(extractPrimaryKey(newTask.uniqueId.S).uuid, task.tags)
  }

  await dynamoDB.putItem(params)

  return taskMappeer(newTask, task.tags)
}

export const getTasks = async (): Promise<Partial<Task>[]> => {

  const params: QueryCommandInput = {
    TableName: tableName,
  }
  const { Items } = await dynamoDB.scan(params)

  if (!Items || Items.length === 0) {
    return []
  }

  const tasks = Items.filter((item) => item.sortKey.S === SortKeyEnum.Task)
  const tags = Items.filter((item) => item.sortKey.S?.startsWith(SortKeyEnum.TaskTag))

  const mappedTasks = tasks.map((task) => {
    const taskTags = tags
      .filter((tag) => tag.uniqueId.S === task.uniqueId.S)
      .map((tag) => extractPrimaryKey(tag.tag_gsi.S!).uuid)

    return taskMappeer(task, taskTags)
  })

  return mappedTasks

}

export const getTask = async (uuid: string): Promise<Partial<Task>> => {
  const params: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: 'uniqueId = :uniqueId',
    ExpressionAttributeValues: {
      ':uniqueId': dynamoString(dynamoPrimaryKey(EntityEnum.Task, uuid)),
    },
  }

  const { Items } = await dynamoDB.query(params)

  if (!Items || Items.length === 0) {
    throw new AppError(404, 'Tarefa não encontrada')
  }

  const task = Items.find((item) => item.sortKey.S === SortKeyEnum.Task)
  if (!task) {
    throw new AppError(404, 'Tarefa não encontrada')
  }

  const tags = Items.filter((item) => item.sortKey.S?.startsWith(SortKeyEnum.TaskTag)).map((tag) =>
    extractPrimaryKey(tag.tag_gsi.S!).uuid
  )

  return taskMappeer(task, tags)
}

export const updateTask = async (
  uuid: string,
  task: Task
): Promise<Partial<Task>> => {

  if (!(await existsTask(uuid))) {
    throw new AppError(404, 'Tarefa não encontrada')
  }

  if (task.tags) {
    await validateTags(task.tags)
    await replaceTaskTags(uuid, task.tags)
  }

  const params: UpdateItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Task, uuid, SortKeyEnum.Task),
    UpdateExpression: 'SET #title = :title, #startDate = :startDate, #endDate = :endDate, #description = :description',
    ExpressionAttributeNames: {
      '#title': 'title',
      '#startDate': 'startDate',
      '#endDate': 'endDate',
      '#description': 'description',
    },
    ExpressionAttributeValues: {
      ':title': dynamoString(task.title),
      ':startDate': dynamoString(task.startDate),
      ':endDate': dynamoString(task.endDate),
      ':description': dynamoString(task.description),
    },
    ReturnValues: 'ALL_NEW',
  }

  const { Attributes } = await dynamoDB.updateItem(params)

  return taskMappeer(Attributes!, task.tags)
}

export const deleteTask = async (uuid: string): Promise<void> => {
  if (!(await existsTask(uuid))) {
    throw new AppError(404, 'Tarefa não encontrada')
  }

  const params: DeleteItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Task, uuid, SortKeyEnum.Task),
  }

  await clearTaskTags(uuid)
  await dynamoDB.deleteItem(params)
}