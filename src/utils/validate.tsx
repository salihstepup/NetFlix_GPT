export const checkValidData = (
  email: string,
  password: string
): string | null => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};

// // validate.ts OR

// // Email validation
// export const validateEmail = (email: string): string | null => {
//   if (!email) return "Email is required";

//   const isEmailValid =
//     /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

//   if (!isEmailValid) return "Email ID is not valid";

//   return null;
// };

// // Password validation
// export const validatePassword = (password: string): string | null => {
//   if (!password) return "Password is required";

//   const isPasswordValid =
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

//   if (!isPasswordValid) return "Password is not valid";

//   return null;
// };

// // First Name validation
// export const validateFirstName = (firstName: string): string | null => {
//   if (!firstName) return "First name is required";

//   if (firstName.trim().length < 2)
//     return "First name must be at least 2 characters";

//   return null;
// };

// // Last Name validation
// export const validateLastName = (lastName: string): string | null => {
//   if (!lastName) return "Last name is required";

//   if (lastName.trim().length < 2)
//     return "Last name must be at least 2 characters";

//   return null;
// };
