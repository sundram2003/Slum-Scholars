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
        // console.log("test",encryptedData);
        
        const iv = Buffer.from(encryptedData.iv, 'hex');
        const encryptedText = Buffer.from(encryptedData.encryptedData, 'hex');
        console.log("iv",iv,"encryptedText",encryptedText);
        
        const decipher = crypto.createDecipheriv(ALGORITHM, normalizedKey, iv);
        console.log("decipher",decipher,ALGORITHM, normalizedKey, iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
    }
};

/*
 {
    _id: new ObjectId('671c8673f9a49f4ad90ce9fd'),
    fullName: 'ada',
    currentAddress: 'fa',
    permanentAddress: 'fa',
    aadharNumber: '{"iv":"d6c93203f85eadf351ed7b91d11d3d4e","encryptedData":"4509496cacf424ec7f0e484a77fb00bb"}',
    phoneNumber: '{"iv":"4039966b74fd1d9714aae173543d341c","encryptedData":"7e2cf011f9053be09bd95155d6130dfc"}',
    activity: 'Marketing',
    dateOfBirth: 2024-05-28T00:00:00.000Z,
    qualification: '12th Pass',
    otherQualifications: '41',
    email: 'k@gmail.com',
    __v: 0
  },
  {
    _id: new ObjectId('671c922c21bc87433755036e'),
    fullName: 'a',
    currentAddress: 'da',
    permanentAddress: 'd',
    aadharNumber: '{"iv":"52e7dcbfa5673f368304165ec7025876","encryptedData":"38779b65355a802cba4daabd0260b158"}',
    phoneNumber: '9581424185',
    activity: 'Teaching',
    dateOfBirth: 2002-06-26T00:00:00.000Z,
    qualification: '12th Pass',
    otherQualifications: 'pookiemane',
    email: 'qrq@gmail.com',
    __v: 0
  
    {"_id":{"$oid":"67210ac35942c6e8f02aef8b"},"fullName":"Aachintya","currentAddress":"afha ","permanentAddress":" fahfla","aadharNumber":"{\"iv\":\"bd290f0795354cf5f883fc755a5f32fd\",\"encryptedData\":\"6922e5b80bcfbc61399d6fbab6a8112b\"}","phoneNumber":"9621214402","activity":"Management","dateOfBirth":{"$date":{"$numberLong":"1729814400000"}},"qualification":"12th Pass","otherQualifications":"phd","email":"h@gmai.com","__v":{"$numberInt":"0"}}
    */


    // (()=>{
        // const data='Hello'
        // const parsedData=encrypt(data);
        // console.log(typeof parsedData);
        // console.log(decrypt(parsedData));
    //     const ndata='{"iv":"bd290f0795354cf5f883fc755a5f32fd","encryptedData":"6922e5b80bcfbc61399d6fbab6a8112b"}';
    //     console.log(decrypt(JSON.parse(ndata)));
            
    // })()