export const getFullNameDriver = (data = {}) => {
  let fullName = '';

  if (data && typeof data === 'object' && Object.keys(data).length)
    fullName =
      data.givenName && data.familyName
        ? `${data.givenName} ${data.familyName}`
        : data.givenName
        ? data.givenName
        : data.familyName
        ? data.familyName
        : '';

  return fullName;
};
