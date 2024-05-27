import z from "zod";

export const CustomerFormSchema = z.object({
  id: z.number(),
  taxCode: z.string().optional(),
  urn: z.string().optional(),
  fullName: z.string({
    required_error: "Tên khách hàng không được bỏ trống",
  }),
  street: z.string().optional(),
  wardCode: z.string({
    required_error: "Phường/Xã không được bỏ trống",
    invalid_type_error: "Chưa chọn Phường/Xã",
  }),
});

export const CreateCustomerFormSchema = CustomerFormSchema.omit({ id: true });
