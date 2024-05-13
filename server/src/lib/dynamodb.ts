import { DYNAMO_CONFIG } from '@/config'
import { EntityEnum, SortKeyEnum } from '@/database/entityEnum'
import { AttributeValue, DynamoDB } from '@aws-sdk/client-dynamodb'
import { randomUUID } from 'crypto'

export const dynamoDB = new DynamoDB(DYNAMO_CONFIG)

export const dynamoString = (value: string) => ({ S: value })
export const dynamoNumber = (value: number) => ({ N: value.toString() })

export const dynamoPrimaryKey = (schema: EntityEnum, uuid: string) => `${schema}#${uuid}` 
export const generateDynamoPrimaryKey = (schema: EntityEnum) => `${schema}#${randomUUID()}`

export const extractPrimaryKey = (primaryKey: string) => {
  const [schema, uuid] = primaryKey.split('#')
  return { schema, uuid }
}

export function createKey(entity: EntityEnum, uuid: string, sortKey: SortKeyEnum): Record<string, AttributeValue> {
  return {
    uniqueId: dynamoString(dynamoPrimaryKey(entity, uuid)),
    sortKey: dynamoString(sortKey),
  };
}


export const tableName = 'task_calendar'