import DOMPurify from "dompurify";

export const sanitizeInput = (input) =>
  typeof input === "string" ? DOMPurify.sanitize(input, { ALLOWED_TAGS: [] }).trim() : input;
export const safeArray = (val) => (Array.isArray(val) ? val : []);
