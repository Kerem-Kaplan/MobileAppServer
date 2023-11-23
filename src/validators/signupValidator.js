const gmailValidator = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

const dateOfBirthValidator = (dateOfBirth) => {
  const dateOfBirthRegex = /^\d+$/;
  return dateOfBirthRegex.test(dateOfBirth);
};

const identityNumberOrPassportNumberValidator = (
  identityNumberOrPassportNumber
) => {
  if (identityNumberOrPassportNumber.length !== 11) {
    console.log("KİMLİK NUMARASI 11 HANELİ OLMALI");
    return false;
  } else {
    return true;
  }
};

const phoneNumberValidator = (phoneNumber) => {
  if (phoneNumber.length !== 11) {
    console.log("Telefon numarası 11 haneli olmalı");
    return false;
  } else {
    return true;
  }
};

const SignupValidator = {
  gmailValidator,
  dateOfBirthValidator,
  identityNumberOrPassportNumberValidator,
  phoneNumberValidator,
};

module.exports = { SignupValidator };
