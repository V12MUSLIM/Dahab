
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

export const isValidPhone = (phone) => /^\+?[\d\s\-()]{10,}$/.test(String(phone || "").trim());

export const validateDates = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return { valid: false, error: "Both dates are required" };
  const inD = new Date(checkIn);
  const outD = new Date(checkOut);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  if (isNaN(inD.getTime()) || isNaN(outD.getTime())) return { valid: false, error: "Invalid date(s)" };
  if (inD < today) return { valid: false, error: "Check-in date cannot be in the past" };
  if (outD <= inD) return { valid: false, error: "Check-out must be after check-in" };

  return { valid: true };
};
