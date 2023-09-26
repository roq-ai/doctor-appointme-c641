import * as yup from 'yup';

export const healthcareProviderValidationSchema = yup.object().shape({
  provider_name: yup.string().required(),
  provider_address: yup.string().required(),
  contact_number: yup.string().required(),
  email: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
