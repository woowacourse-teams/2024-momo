import { useContext } from 'react';

import { UuidContext } from '@contexts/UuidProvider';

import useInput from '@hooks/useInput/useInput';

import { usePostLoginMutation } from '@stores/servers/user/mutations';

import { FIELD_ERROR_MESSAGES, INPUT_FIELD_PATTERN } from '@constants/inputFields';

const useAttendeeLogin = () => {
  const { uuid } = useContext(UuidContext);
  const { mutate: postLoginMutate } = usePostLoginMutation();

  const attendeeNameInput = useInput({
    pattern: INPUT_FIELD_PATTERN.nickname,
    errorMessage: FIELD_ERROR_MESSAGES.nickname,
  });
  const isAttendeeNameError = attendeeNameInput.errorMessage !== null;
  const attendeeNameField = { ...attendeeNameInput, isError: isAttendeeNameError };

  const attendeePasswordInput = useInput({
    pattern: INPUT_FIELD_PATTERN.password,
    errorMessage: FIELD_ERROR_MESSAGES.password,
  });
  const isAttendeePasswordError = attendeePasswordInput.errorMessage !== null;
  const attendeePasswordField = { ...attendeePasswordInput, isError: isAttendeePasswordError };

  const isFormValid = () => {
    const hasLoginFormError = isAttendeeNameError || isAttendeePasswordError;

    if (hasLoginFormError) {
      return false;
    }

    const requiredFields = [attendeeNameInput.value, attendeePasswordInput.value];
    const isAllFieldsFilled = requiredFields.every((field) => field !== '');

    return isAllFieldsFilled;
  };

  const handleLoginButtonClick = async () => {
    postLoginMutate({
      uuid,
      request: { attendeeName: attendeeNameInput.value, password: attendeePasswordInput.value },
    });
  };

  return {
    attendeeNameField,
    attendeePasswordField,
    isFormValid,
    handleLoginButtonClick,
    uuid,
  };
};

export default useAttendeeLogin;
