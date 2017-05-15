const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-groups.json')) {
            fs.writeFileSync('data-groups.json', '');
        }

        fs.readFile('data-groups.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let groups = data ? JSON.parse(data) : [];
            if (groups.length > 0 && searchText) {
                groups = groups.filter(p => {
                    return p.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(groups);
        });
    });
}

function create(groupname, username) {
    return new Promise((resolve, reject) => {
        const newGroup = {
            id: uuid(),
            name: groupname,
            ts: moment().unix(),
            usernames: [{username: username}]
        };

        list().then(groups => {
            groups = [
                newGroup,
                ...groups
            ];
            fs.writeFile('data-groups.json', JSON.stringify(groups), err => {
                if (err) reject(err);

                resolve(newGroup);
            });
        });
    });
}

function get(id) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-groups.json')) {
            fs.writeFileSync('data-groups.json', '');
        }

        fs.readFile('data-groups.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let groups = data ? JSON.parse(data) : [];
            if (groups.length > 0) {
                groups = groups.filter(p => {
                    if(p.id === id)
                      return p
                });
            }

            resolve(groups);
        });
    });
}

function addMembers(id, username) {
    return new Promise((resolve, reject) => {
        const newUsername = {username: username};
        list().then(groups => {
            groups = groups.map(p => {
                if (p.id === id) {
                    p.usernames = [
                      newUsername,
                      ...p.usernames];
                }

                return p
            });
            fs.writeFile('data-groups.json', JSON.stringify(groups), err => {
                if (err) reject(err);

                resolve(groups);
            });
        });
    });
}

function deleteMembers(id, username) {
    return new Promise((resolve, reject) => {

        list().then(groups => {
            var obj = {username: username};
            groups = groups.map(p => {
                if (p.id === id) {
                  p.usernames = p.usernames.filter(function (item) {
                        if(item.username!==this.username){
                          return true;
                        }
                        else {
                          return false;
                        }
                    }, obj);
                }

                return p
            });
            fs.writeFile('data-groups.json', JSON.stringify(groups), err => {
                if (err) reject(err);

                resolve(groups);
            });
        });
    });
}

function delete_(id) {
  return new Promise((resolve, reject) => {
      list().then(groups => {
          var obj = {id: id};
          groups = groups.filter(function (item) {
              if(item.id!==this.id)
                return true;
          }, obj);
          fs.writeFile('data-groups.json', JSON.stringify(groups), err => {
              if (err) reject(err);

              resolve(groups);
          });
      });
  });
}

module.exports = {
    list,
    create,
    addMembers,
    deleteMembers,
    get,
    delete_
};
