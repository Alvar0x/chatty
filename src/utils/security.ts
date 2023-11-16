import CryptoJS from "crypto-js";

export const encrypt = ( plainText: string ) => {
    const cipherText = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_AES_SECRET_KEY as string), {iv: CryptoJS.enc.Hex.parse(process.env.NEXT_PUBLIC_AES_IV as string), padding: CryptoJS.pad.NoPadding}).toString();
    return cipherText;
}

export const decrypt = ( cipherText:string ) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, process.env.NEXT_PUBLIC_AES_SECRET_KEY as string);
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
}