import bcrypt from "bcrypt";

// Function to hash a plaintext password
export const hashPassword = async (password) => {
  try {
    // Number of salt rounds to use in the hashing process (higher means more secure but slower)
    const saltRounds = 10;

    // Hash the password using bcrypt with the specified number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Return the hashed password
    return hashedPassword;
  } catch (error) {
    // Log any errors that occur during the hashing process
    console.log(error);
  }
};

// Function to compare a plaintext password with a hashed password
export const comparePassword = async (password, hashedPassword) => {
  // Use bcrypt to compare the provided password with the hashed password
  // Returns true if the passwords match, otherwise false
  return bcrypt.compare(password, hashedPassword);
};
