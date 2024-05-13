import { createKey, dynamoDB, dynamoPrimaryKey, dynamoString, extractPrimaryKey, generateDynamoPrimaryKey, tableName } from "@/lib"
import { Tag } from "@/model/tagModel"
import { AppError } from "@/utils"
import { AttributeValue, DeleteItemCommandInput, GetItemCommandInput, PutItemCommandInput, QueryCommandInput, ScanCommandInput, UpdateItemCommandInput } from "@aws-sdk/client-dynamodb"
import { EntityEnum, SortKeyEnum } from "./entityEnum"

const tagMapper = (item: Record<string, AttributeValue>) => ({
  uuid: extractPrimaryKey(item.uniqueId.S!).uuid,
  name: item.name.S,
  color: item.color?.S,
})

function sortKeyTagLink(tagUuid: string): AttributeValue {
  return dynamoString(SortKeyEnum.TaskTag + '#' + tagUuid)
}

export const existsTag = async (uuid: string) => {
  const params: GetItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Tag, uuid, SortKeyEnum.Tag),
  }
  const { Item } = await dynamoDB.getItem(params)
  return !!Item
}

export const validateTags = async (tags: string[]) => {
  const checkPromises = tags.map(tagUuid => existsTag(tagUuid).then(exists => ({ tagUuid, exists })));

  const results = await Promise.all(checkPromises)

  const missingTags = results.filter(({ exists }) => !exists).map(({ tagUuid }) => tagUuid)

  if (missingTags.length > 0) {
    throw new AppError(404, `Tags não encontradas: ${missingTags.join(', ')}`)
  }
}

export const createTag = async (tag: Tag) => {
  const newTag = {
    uniqueId: dynamoString(generateDynamoPrimaryKey(EntityEnum.Tag)),
    sortKey: dynamoString(SortKeyEnum.Tag),
    name: dynamoString(tag.name),
    color: dynamoString(tag.color),
  }

  const params: PutItemCommandInput = {
    TableName: tableName,
    Item: newTag,
    ConditionExpression: 'attribute_not_exists(uniqueId)',
  }

  await dynamoDB.putItem(params)

  return tagMapper(newTag)
}

export const getTags = async () => {
  const params: ScanCommandInput = {
    TableName: tableName,
    ScanFilter: {
      sortKey: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [dynamoString(SortKeyEnum.Tag)],
      },
    },
  }

  const { Items } = await dynamoDB.scan(params)

  if (!Items) {
    return []
  }

  return Items.map(tagMapper)
}

export const getTag = async (uuid: string) => {
  const params: GetItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Tag, uuid, SortKeyEnum.Tag),
  };

  const { Item } = await dynamoDB.getItem(params);

  if (!Item) {
    throw new AppError(404, 'Tag não encontrada');
  }

  return tagMapper(Item);
};

export const deleteTag = async (uuid: string) => {
  if (!(await existsTag(uuid))) {
    throw new AppError(404, 'Tag não encontrada')
  }

  const params: DeleteItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Tag, uuid, SortKeyEnum.Tag),
  }

  await dynamoDB.deleteItem(params)
  await deleteLinksFromTag(uuid)
}

export const deleteLinksFromTag = async (tagUuid: string) => {
  const params: QueryCommandInput = {
    TableName: tableName,
    IndexName: 'tag_gsi-index',
    KeyConditionExpression: '#tag_gsi = :tag_gsi',
    ExpressionAttributeNames: {
      '#tag_gsi': 'tag_gsi',
    },
    ExpressionAttributeValues: {
      ':tag_gsi': dynamoString(dynamoPrimaryKey(EntityEnum.Tag, tagUuid)),
    },
  };

  const { Items } = await dynamoDB.query(params);

  if (Items && Items.length > 0) {
    for (const item of Items) {
      const deleteParams: DeleteItemCommandInput = {
        TableName: tableName,
        Key: {
          uniqueId: item.uniqueId,
          sortKey: item.sortKey,
        },
      };
      await dynamoDB.deleteItem(deleteParams);
    }
  }
};

export const updateTag = async (uuid: string, tag: Tag) => {
  if (!(await existsTag(uuid))) {
    throw new AppError(404, 'Tag não encontrada');
  }

  const params: UpdateItemCommandInput = {
    TableName: tableName,
    Key: createKey(EntityEnum.Tag, uuid, SortKeyEnum.Tag),
    UpdateExpression: 'SET #name = :name, #color = :color',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#color': 'color',
    },
    ExpressionAttributeValues: {
      ':name': dynamoString(tag.name),
      ':color': dynamoString(tag.color),
    },
    ReturnValues: 'ALL_NEW',
  };

  const { Attributes } = await dynamoDB.updateItem(params);
  return tagMapper(Attributes!);
};

export const linkTagsToTask = async (taskUuid: string, tags: string[]) => {
  for (const tagUuid of tags) {
    if (!(await existsTag(tagUuid))) {
      throw new AppError(404, `Tag ${tagUuid} não encontrada`)
    }

    const params: PutItemCommandInput = {
      TableName: tableName,
      Item: {
        uniqueId: dynamoString(dynamoPrimaryKey(EntityEnum.Task, taskUuid)),
        sortKey: sortKeyTagLink(tagUuid),
        tag_gsi: dynamoString(dynamoPrimaryKey(EntityEnum.Tag, tagUuid)),
      },
    }

    await dynamoDB.putItem(params)
  }
}

export const clearTaskTags = async (taskUuid: string) => {
  const params: QueryCommandInput = {
    TableName: tableName,
    KeyConditionExpression: '#uniqueId = :uniqueId AND begins_with(#sortKey, :sortKey)',
    ExpressionAttributeNames: {
      '#uniqueId': 'uniqueId',
      '#sortKey': 'sortKey',
    },
    ExpressionAttributeValues: {
      ':uniqueId': dynamoString(dynamoPrimaryKey(EntityEnum.Task, taskUuid)),
      ':sortKey': dynamoString(SortKeyEnum.TaskTag),
    },
  }

  const { Items } = await dynamoDB.query(params)

  if (Items && Items.length > 0) {
    for (const item of Items) {
      const deleteParams: DeleteItemCommandInput = {
        TableName: tableName,
        Key: {
          uniqueId: item.uniqueId,
          sortKey: item.sortKey,
        },
      }
      await dynamoDB.deleteItem(deleteParams)
    }
  }

}

export const replaceTaskTags = async (taskUuid: string, tags: string[]) => {
  await clearTaskTags(taskUuid)
  await linkTagsToTask(taskUuid, tags)
}