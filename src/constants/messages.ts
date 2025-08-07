export const messages = {
  validation: {
    birthdateComparisonMutualExistence:
      'birthdate must be defined when birthdateComparison is provided.',
    astrobiologyOrRelatedStartYearComparisonMutualExistence:
      'astrobiologyOrRelatedStartYear must be defined when astrobiologyOrRelatedStartYearComparison is provided.',
    mainActivityAreaAndSpecificActivityDescription:
      'If "Other" is selected as the main area of activity, a description must be provided — and must not be provided otherwise.',
    scholarshipHolderAndSponsoringOrganization:
      'If you are a scholarship holder, you must provide a sponsoring organization — and must leave it blank if you are not.',
    invalidCpf: 'Invalid CPF',
    invalidCpfLength: 'CPF must contain 11 digits',
    invalidCpfFormat: 'Invalid CPF format',
    monthYearInvalidFormat: 'Date must be in format YYYY-MM',
    invalidDateRange:
      'Invalid date. Only a range of up to 100 years from the current year is allowed.',
    invalidOrcidFormat:
      'Invalid orcid number format. It must be provided in the format: 0000-0000-0000-0000',
    invalidPasswordFormat:
      'The password must contain at least 8 characters, one uppercase letter, one numeric digit and one special character.',
    invalidInnerSpaces: 'This field cannot have spaces.',
    completionDateBeforeStartDate:
      'The expected course completion date cannot be earlier than the start date.',
    invalidAuthenticationInput:
      'Authentication error: Invalid email, username or password format.',
  },
  errors: {
    noUsersAvailable: 'No available users info to export.',
    invalidCreddentials: 'Invalid credentials.',
    invalidAreaOfActivity: 'Invalid area of activity.',
    invalidToken: 'Invalid or expired token.',
    resourceNotFound: 'Resource not found.',
    userAlreadyExists: 'User already exists.',
    userAlreadyHasAddress: 'The user already has an address.',
    userImageStorage: 'Error trying to process user profile picture.',
    userNotFound: 'User not found.',
    userNotFoundForPasswordReset:
      'If the user exists, you will receive an email with instructions to reset the password.',
    userWithSameEmailOrPassword:
      'There is already an user with the same email or username.',
    forbbiden: 'User does not have permission to use this resource.',
    unauthorized: 'User not authenticated.',
  },
  info: {
    changedPassword: 'Password changed successfully!',
    logout: 'Logout successful!',
  },
}
