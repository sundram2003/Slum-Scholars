// config/encryption.js
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();
const normalizeKey = (key) => {
  if (/^[0-9a-f]+$/i.test(key)) {
    return Buffer.from(key, 'hex');
  }
  
  const hash = crypto.createHash('sha256');
  hash.update(key);
  return hash.digest();
};

const IV_LENGTH = 16;
const ALGORITHM = 'aes-256-cbc';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-byte-secure-key-here';
const normalizedKey = normalizeKey(ENCRYPTION_KEY);

export const encrypt = (text) => {
    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, normalizedKey, iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted.toString('hex')
        };
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
};

export const decrypt = (encryptedData) => {
    try {
        const iv = Buffer.from(encryptedData.iv, 'hex');
        const encryptedText = Buffer.from(encryptedData.encryptedData, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, normalizedKey, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
    }
};