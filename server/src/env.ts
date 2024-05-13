import { z } from 'zod'

const requiredMessage = (field: string) => `The ${field} is required`

const envFields = [
  'SERVER_PORT',
  'AWS_REGION',
  'AWS_DYNAMODB_ACCESS_KEY',
  'AWS_DYNAMODB_SECRET_KEY',
  'AWS_DYNAMODB_ENDPOINT',
]

const buildEnvSchema = (fields: string[]) => {
  const schemaProperties = fields.reduce<Record<string, z.ZodString>>(
    (acc, field) => {
      acc[field] = z
        .string({ required_error: requiredMessage(field) })
        .min(1, requiredMessage(field))
      return acc
    },
    {}
  )

  return z.object(schemaProperties)
}

const envSchema = buildEnvSchema(envFields)

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)
