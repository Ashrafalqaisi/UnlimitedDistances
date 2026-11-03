// Sign-up form rules shared by the web and mobile apps.
// Keep them in sync with apps/api/src/modules/auth/dto/auth.dto.ts, which enforces the same rules.

export const USERNAME_PATTERN = /^[a-z][a-z0-9._]{2,29}$/;
export const PHONE_PATTERN = /^\+?[0-9]{7,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface RegisterForm {
  fullName: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

/** Which password requirements a value meets, for a live checklist under the password field. */
export function passwordChecks(password: string) {
  return {
    length: password.length >= 8 && password.length <= 72,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

export type PasswordCheck = keyof ReturnType<typeof passwordChecks>;

export type RegisterFieldError =
  | 'required'
  | 'fullNameLength'
  | 'emailInvalid'
  | 'usernameInvalid'
  | 'phoneInvalid'
  | 'passwordWeak'
  | 'passwordMismatch';

export function normalizePhone(phone: string) {
  return phone.replace(/[\s\-()]/g, '');
}

/** Returns an error code per invalid field; an empty object means the form can be submitted. */
export function validateRegisterForm(form: RegisterForm) {
  const errors: Partial<Record<keyof RegisterForm, RegisterFieldError>> = {};
  const fullName = form.fullName.trim();
  const email = form.email.trim();
  const username = form.username.trim().toLowerCase();
  const phone = normalizePhone(form.phone);

  if (!fullName) errors.fullName = 'required';
  else if (fullName.length < 2 || fullName.length > 100) errors.fullName = 'fullNameLength';

  if (!email) errors.email = 'required';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'emailInvalid';

  if (!username) errors.username = 'required';
  else if (!USERNAME_PATTERN.test(username)) errors.username = 'usernameInvalid';

  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = 'phoneInvalid';

  if (!form.password) errors.password = 'required';
  else if (!Object.values(passwordChecks(form.password)).every(Boolean)) errors.password = 'passwordWeak';

  if (!form.confirmPassword) errors.confirmPassword = 'required';
  else if (form.confirmPassword !== form.password) errors.confirmPassword = 'passwordMismatch';

  return errors;
}
