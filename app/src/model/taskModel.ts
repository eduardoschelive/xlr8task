import { z } from "zod";

export const taskSchema = z.object({
  uuid: z.string().uuid(
    {
      message: "O identificador deve ser um UUID válido",
    }
  ).optional(),
  title: z.string(
    {
      required_error: "O título é obrigatório",
    }
  ).min(3, "O título deve ter no mínimo 3 caracteres"),
  startDate: z.date(
    {
      required_error: "A data inicial é obrigatória",
    }
  ),
  endDate: z.date(
    {
      required_error: "A data final é obrigatória",
    }
  ),
  tags: z.array(z.string()).optional(),
  description: z.string(
    {
      required_error: "A descrição é obrigatória",
    }
  ).min(3, "A descrição deve ter no mínimo 3 caracteres"
  ),
}).refine((data) => data.startDate < data.endDate, {
  message: "A data inicial deve ser anterior à data final",
  path: ["startDate"],
}).refine((data) => data.endDate > new Date(), {
  message: "A data final deve ser posterior à data atual",
  path: ["endDate"],
});

export type Task = z.infer<typeof taskSchema>;