import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getClinicById, updateClinicById } from 'apiSdk/clinics';
import { clinicValidationSchema } from 'validationSchema/clinics';
import { ClinicInterface } from 'interfaces/clinic';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function ClinicEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const imageUploaderRef = useRef(null);
  const { data, error, isLoading, mutate } = useSWR<ClinicInterface>(
    () => (id ? `/clinics/${id}` : null),
    () => getClinicById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ClinicInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      await imageUploaderRef.current.handleUpload();
      const updated = await updateClinicById(id, values);
      mutate(updated);
      resetForm();
      router.push('/clinics');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const handleImageChange = async (file: File | null) => {
    //
  };

  const formik = useFormik<ClinicInterface>({
    initialValues: data,
    validationSchema: clinicValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Clinics',
              link: '/clinics',
            },
            {
              label: 'Update Clinic',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Clinic
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper wrapperProps={{ mb: 3 }}>
          <ImagePicker ref={imageUploaderRef} onChange={handleImageChange} entity="clinic" entityId={id} />
        </FormWrapper>

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.opening_hours}
            label={'Opening Hours'}
            props={{
              name: 'opening_hours',
              placeholder: 'Opening Hours',
              value: formik.values?.opening_hours,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.closing_hours}
            label={'Closing Hours'}
            props={{
              name: 'closing_hours',
              placeholder: 'Closing Hours',
              value: formik.values?.closing_hours,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/clinics')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'clinic',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ClinicEditPage);
