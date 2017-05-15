const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(groupid, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(`data-chats-${groupid}.json`)) {
            fs.writeFileSync(`data-chats-${groupid}.json`, '');
        }

        fs.readFile(`data-chats-${groupid}.json`, 'utf8', (err, data) => {
            if (err) reject(err);

            let chats = data ? JSON.parse(data) : [];
            if (chats.length > 0 && searchText) {
                chats = chats.filter(p => {
                    return p.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(chats);
        });
    });
}

function create(groupid, username, text) {
    return new Promise((resolve, reject) => {
        const newChat = {
            id: uuid(),
            text: text,
            ts: moment().unix(),
            username:username
        };

        list(groupid,'').then(chats => {
            chats = [
                newChat,
                ...chats
            ];

            fs.writeFile(`data-chats-${groupid}.json`, JSON.stringify(chats), err => {
                if (err) reject(err);

                resolve(newChat);
            });
        });
    });
}

function list_hid(groupid, searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(`data-chats-${groupid}-hid.json`)) {
            fs.writeFileSync(`data-chats-${groupid}-hid.json`, '');
        }

        fs.readFile(`data-chats-${groupid}-hid.json`, 'utf8', (err, data) => {
            if (err) reject(err);

            let chats = data ? JSON.parse(data) : [];
            if (chats.length > 0 && searchText) {
                chats = chats.filter(p => {
                    return p.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(chats);
        });
    });
}

function create_hid(groupid, username, text) {
    return new Promise((resolve, reject) => {
        const newChat = {
            id: uuid(),
            text: text,
            ts: moment().unix(),
            username:username
        };

        list_hid(groupid,'').then(chats => {
            chats = [
                newChat,
                ...chats
            ];

            fs.writeFile(`data-chats-${groupid}-hid.json`, JSON.stringify(chats), err => {
                if (err) reject(err);

                resolve(newChat);
            });
        });
    });
}



module.exports = {
    list,
    create,
    list_hid,
    create_hid

};
