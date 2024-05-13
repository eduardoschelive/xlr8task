import { env } from '@/env'
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'

export const DYNAMO_CONFIG: DynamoDBClientConfig = {
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_DYNAMODB_ACCESS_KEY,
    secretAccessKey: env.AWS_DYNAMODB_SECRET_KEY,
  },
  endpoint: env.AWS_DYNAMODB_ENDPOINT,
} as const
