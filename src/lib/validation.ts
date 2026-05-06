// Lightweight validators — keep dependencies zero.

export type Validator<T> = (value: unknown) => { ok: true; value: T } | { ok: false; reason: string };

export function isString(min = 1, max = 5000): Validator<string> {
  return (v) => {
    if (typeof v !== "string") return { ok: false, reason: "Expected string" };
    const trimmed = v.trim();
    if (trimmed.length < min) return { ok: false, reason: `Too short (min ${min})` };
    if (trimmed.length > max) return { ok: false, reason: `Too long (max ${max})` };
    return { ok: true, value: trimmed };
  };
}

export function isOptionalString(max = 5000): Validator<string | undefined> {
  return (v) => {
    if (v === undefined || v === null || v === "") return { ok: true, value: undefined };
    if (typeof v !== "string") return { ok: false, reason: "Expected string" };
    const trimmed = v.trim();
    if (trimmed.length > max) return { ok: false, reason: `Too long (max ${max})` };
    return { ok: true, value: trimmed };
  };
}

export function isEmail(): Validator<string> {
  return (v) => {
    if (typeof v !== "string") return { ok: false, reason: "Expected email" };
    const trimmed = v.trim();
    // Pragmatic email check — RFC-correct is overkill here.
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) return { ok: false, reason: "Invalid email" };
    if (trimmed.length > 200) return { ok: false, reason: "Email too long" };
    return { ok: true, value: trimmed };
  };
}

export function isPhone(): Validator<string> {
  return (v) => {
    if (typeof v !== "string") return { ok: false, reason: "Expected phone" };
    const trimmed = v.trim();
    if (!/^[+0-9\s\-()]{8,20}$/.test(trimmed)) return { ok: false, reason: "Invalid phone" };
    return { ok: true, value: trimmed };
  };
}

export function isPin(): Validator<string> {
  return (v) => {
    if (typeof v !== "string") return { ok: false, reason: "Expected PIN" };
    const trimmed = v.trim();
    if (!/^\d{6}$/.test(trimmed)) return { ok: false, reason: "PIN must be 6 digits" };
    return { ok: true, value: trimmed };
  };
}

export function isOneOf<T extends string>(allowed: readonly T[]): Validator<T> {
  return (v) => {
    if (typeof v !== "string") return { ok: false, reason: "Expected string" };
    if (!(allowed as readonly string[]).includes(v)) return { ok: false, reason: `Must be one of: ${allowed.join(", ")}` };
    return { ok: true, value: v as T };
  };
}

export type ValidatorMap = Record<string, Validator<unknown>>;
export type ValidatedShape<M extends ValidatorMap> = {
  [K in keyof M]: M[K] extends Validator<infer T> ? T : never;
};

export function validateObject<M extends ValidatorMap>(
  input: unknown,
  shape: M,
): { ok: true; value: ValidatedShape<M> } | { ok: false; errors: Record<string, string> } {
  if (typeof input !== "object" || input === null) return { ok: false, errors: { _root: "Expected object" } };
  const obj = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const out: Record<string, unknown> = {};
  for (const [key, validator] of Object.entries(shape)) {
    const result = validator(obj[key]);
    if (!result.ok) errors[key] = result.reason;
    else out[key] = result.value;
  }
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: out as ValidatedShape<M> };
}
