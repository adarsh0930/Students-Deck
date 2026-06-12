import CryptoJS from 'crypto-js';

const CLIENT_SECRET_STRING = 'frontend-secret-key-123456789012';
const key = CryptoJS.enc.Utf8.parse(CLIENT_SECRET_STRING);
const staticIv = CryptoJS.enc.Utf8.parse('1234567890123456');

// We keep the password deterministic so it always generates the same L1 string for login comparisons
export const encryptL1 = (text: string): string => {
    if (!text) return text;
    return CryptoJS.AES.encrypt(text, key, {
        iv: staticIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
};

export const decryptL1 = (cipherText: string): string => {
    if (!cipherText) return cipherText;
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, key, {
            iv: staticIv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        return '';
    }
};

export const processPayloadL1 = (data: any, action: 'encrypt' | 'decrypt') => {
    const processed: any = { ...data }; // Copy all fields in plain text

    // ONLY encrypt or decrypt if the password field exists in the payload
    if (processed.password) {
        processed.password = action === 'encrypt' 
            ? encryptL1(data.password) 
            : decryptL1(data.password);
    }
    
    return processed;
};