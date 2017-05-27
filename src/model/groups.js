const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(searchText = '', username) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-groups.json')) {
            fs.writeFileSync('data-groups.json', '');
        }

        fs.readFile('data-groups.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let groups = data ? JSON.parse(data) : [];
            if (groups.length > 0 && searchText) {
                groups = groups.filter(p => {
                    p.usernames = p.usernames.filter(e => {
                      let exist = false;
                      if(e.username === username){
                        exist = true;
                        return e
                      }
                    });
                    if(exist)
                      return p.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            else if (groups.length > 0){
              groups = groups.filter(p => {
                  let exist = false;
                  p.usernames = p.usernames.map(e => {
                    if(e.username === username)
                      exist = true;
                    return e

                  });
                  if(exist)
                    return true
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

        list('',username).then(groups => {
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

function _addMembers(id, username, username_login) {
    return new Promise((resolve, reject) => {
        const newUsername = {username: username};
        list('',username_login).then(groups => {
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

function addMembers(id, username, username_login){
  return new Promise((resolve, reject) => {
      check(username).then(exist => {
          if(exist){
            _addMembers(id, username, username_login).then(groups => {
              resolve(groups);
            }).catch(err => {reject(err);});
          }
          else {
            resolve('no_exist');
          }
      }).catch(err => {reject(err);});
  });
}



function deleteMembers(id, username, username_login) {
    return new Promise((resolve, reject) => {

        list('', username_login).then(groups => {
            var obj = {username: username};
            let change = false;
            groups = groups.map(p => {
                if (p.id === id) {
                  p.usernames = p.usernames.filter(function (item) {
                        if(item.username!==this.username){
                          return true;
                        }
                        else {
                          change = true;
                          return false;
                        }
                    }, obj);
                }

                return p
            });
            fs.writeFile('data-groups.json', JSON.stringify(groups), err => {
                if (err) reject(err);
                if(change)
                  resolve(groups);
                else
                  resolve('no_exist');
            });
        });
    });
}

function delete_(id,username) {
  return new Promise((resolve, reject) => {
      list('',username).then(groups => {
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

function check(username) {
    return new Promise((resolve, reject) => {

        fs.readFile('data-posts.json', 'utf8', (err, data) => {
            if (err) reject(err);
            let exist = false;
            let posts = data ? JSON.parse(data) : [];
            if (posts.length > 0) {
                posts = posts.filter(p => {
                    if(p.name === username)
                      return p
                });
            }
            if(posts.length > 0)
              exist = true;
            resolve(exist);
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
