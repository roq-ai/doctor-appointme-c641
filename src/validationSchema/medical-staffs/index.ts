import * as yup from 'yup';

export const medicalStaffValidationSchema = yup.object().shape({
  staff_name: yup.string().required(),
  staff_position: yup.string().required(),
  contact_number: yup.string().required(),
  email: yup.string().required(),
  clinic_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
