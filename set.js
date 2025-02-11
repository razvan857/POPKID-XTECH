const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0RnWnpLYjZPOG1HN0NCbmxnVVpVWXR6Mm5LY3VIMjVaaHNOeC9DR1lITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidm9kZDVtZFFHb3hsOXhhQTlsTDlPellrdWlIejhlT0dWMFVTc014N2NCTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTFJEZTAveUtuTy9JcXZlSjRkL2Y1OE83dGxKcWlCVVNJRDFVOFFWejNZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaam5NMWxsWFJDdjdMMkFzZmRaenVlQnRUdSt5OWNCMERybjU1eExDWHdvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVNTGZvWm1jNkdMQXpyTU5yUEx5djNTS0xlRGplYlAzSitZWVJuOVhFMXM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik14UXc2MU9CYm5tS2ZqUUlQcVlLYzZHb2xuL0NhKzhwNDc0NFY4UkR0a1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUxINloxdytuaWdXTjFqZVo1a0lwRkUxRHd6U0hxWWRpSFZuVEcxcTRHTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnJGT3lHdXBZWmRUVlpQRUt3eXluTS9pR1d1eE9ZdU8yWnB6eW1mU2Fodz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik10elJxUXlwUXhBRGx1ejliaFlkVWx2aHowVXNLbDNHbGg2VTBSKzNLd1VWWWgyZEt6OUovOWs4cndKQml2T2Y3QUFhdlZ1N0t0RDU3dDcwQ1V5TURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDQsImFkdlNlY3JldEtleSI6Ikd0cDY1Q3VBZzFBTkRVYkw1YTJkZS9WLytFaGRyZm8xTUFVU2lBOFlMV0U9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiNjI4MjEyMDQ2MDYyM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUY4RjkwQ0U0MDJFRDQwMEQ2QyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM5Mjg2ODQwfSx7ImtleSI6eyJyZW1vdGVKaWQiOiI2MjgyMTIwNDYwNjIzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBQjRDQzVCQjY1QzczMTBGMTUwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MzkyODY4NDJ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InpBLVV4ZlFwVG5HZERac0xBNHFwTHciLCJwaG9uZUlkIjoiMzMxYWEzZWQtODJhMy00MGViLTkwZTYtZDBhNDZkM2Y2Mjk3IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlSMXN6TWV1QWpuZXhMMG54TC9FZHJhcjBpTT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPRCtoU2JrOVJYNEU5V1BTQ1VQbFVFRnMwcGc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNlk3RTdHVlMiLCJtZSI6eyJpZCI6IjYyODIxMjA0NjA2MjM6NTdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiQnl0ZUdob3N0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQN1MwNVlFRUtyU3JiMEdHQnNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqSXB3YThleHRITlp0YjNmUUhSZmR3Unc1VTdtcFZKRHA0Qk1lcExra2t3PSIsImFjY291bnRTaWduYXR1cmUiOiJHUWMrZzRITEw5bFFyS294Rjg2YTQxOVBkbXoyejQ4RUN3YUN3YnA1WHR0R1FvZDYybTd1TVdhL1MyZS9rWGhyUmFVUk5hSXE4MTF0NVNpWHA2VGFCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoicHJtL29UcTFiTmpOVUtvY0RnaEVLSHVkanlIQjArZjZTUWJjbGx6cGdHRnArc2NOem1jSHlGMkd6akQ4VkpUVGRqQkdkOFlGa244NE9MbjBRNjFvRGc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI2MjgyMTIwNDYwNjIzOjU3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQll5S2NHdkhzYlJ6V2JXOTMwQjBYM2NFY09WTzVxVlNRNmVBVEhxUzVKSk0ifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzkyODY4MzksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBR280In0=',
    PREFIXE: process.env.PREFIX || ".",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    OWNER_NAME : process.env.OWNER_NAME || "ByteGhost",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "6282120460623",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "non",
    AUTO_BIO: process.env.AUTO_BIO || "non",
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "non", 
    ANTIVV: process.env.ANTIVV|| "non", 
    ADMGROUP: process.env.ADMGROUP || "non", 
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non", 
    AUTO_REPLY: process.env.AUTO_REPLY || "non",              
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    ANTILINK :process.env.ANTILINK || "non", 
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ BELTAH-MD",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "yes",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
