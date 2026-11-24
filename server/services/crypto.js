import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export const sha256 = value => createHash('sha256').update(value).digest();
export const opaqueId = () => randomBytes(32).toString('base64url');
export const equalSecret = (first, second) => timingSafeEqual(sha256(first), sha256(second));
