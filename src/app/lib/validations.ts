import { REQUIRED_FIELD } from "@/app/lib/messages";
import z from "zod";

export const CustomerFormSchema = z.object({
  id: z.number(),
  taxCode: z.string().optional(),
  urn: z.string().optional(),
  fullName: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .min(1, REQUIRED_FIELD),
  street: z.string().optional(),
  ward: z
    .string({
      required_error: REQUIRED_FIELD,
      invalid_type_error: "Chưa chọn Phường/Xã",
    })
    .min(1, REQUIRED_FIELD),
});

export const CreateCustomerFormSchema = CustomerFormSchema.omit({ id: true });
