export const formatPhoneNumber = (phoneNumber: string) => {
  const countryCode = phoneNumber.slice(0, 3);
  const dialCode = phoneNumber.slice(3, 6);
  const firstPart = phoneNumber.slice(6, 8);
  const secondPart = phoneNumber.slice(8, 10);
  const thirdPart = phoneNumber.slice(10, 12);

  return `${countryCode} (${dialCode}) ${firstPart}-${secondPart}-${thirdPart}`;
};
