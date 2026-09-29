export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());
}

export function normalisePhone(value: string) {
  return value.replace(/[^\d+]/g, "");
}

export function isValidIndianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const local = digits.startsWith("91") && digits.length === 12 ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(local);
}

export function isValidEmailOrPhone(value: string) {
  return isValidEmail(value) || isValidIndianPhone(value);
}
