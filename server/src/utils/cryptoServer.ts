import crypto from 'crypto';

const SERVER_SECRET = process.env.L2_SECRET_KEY || '12345678901234567890123456789012';
const IV_LENGTH = 16;

export const encryptL2 = (text: string): string => {
    if (!text) return text;
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(SERVER_SECRET), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decryptL2 = (text: string): string => {
    if (!text || !text.includes(':')) return text;
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift()!, 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(SERVER_SECRET), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

export const processPayloadL2 = (data: any, action: 'encrypt' | 'decrypt') => {
    const processed: any = { ...data }; // Copy all fields in plain text
    
    // ONLY encrypt or decrypt if the password field exists in the payload
    if (processed.password) {
        processed.password = action === 'encrypt' 
            ? encryptL2(data.password) 
            : decryptL2(data.password);
    }
    
    return processed;
};