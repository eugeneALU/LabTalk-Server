const fs = require('fs');
const uuid = require('uuid/v4');
const moment =require('moment');

function list(filterName = '',filterPassword =''){
  return new Promise((resolve,reject) => {
      if(!fs.existsSync('data-posts.json')){ //create data-post.json if not create
          fs.writeFileSync('data-posts.json', '');
      }

      fs.readFile('data-posts.json', 'utf8', (err, data) => {
        if(err) reject(err);

        let posts= data ? JSON.parse(data): [];
        if (!filterPassword){
          posts = posts.filter(p =>{
            return (p.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);

          });
        }
        if((posts.length > 0 && filterName)  && (posts.length > 0 && filterPassword)){
          posts = posts.filter(p =>{
            return ((p.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1) &&
            (p.password.toLowerCase().indexOf(filterPassword.toLowerCase()) !== -1));
          });
        }
        resolve(posts);
      });
  }
);
}

function create(name,password,email){
  return new Promise((resolve, reject) => {
    const newAccount = {
      id: uuid(),
      name: name,
      password: password,
      email: email,
      ts: moment().unix()
    };

    list().then(posts => {
      if(posts == '') {posts=[newAccount];}
      else {posts =[newAccount, ...posts];}
    fs.writeFile('data-posts.json',JSON.stringify(posts),err =>{
      if(err) reject(err);

      resolve(newAccount);
      });
    });
  });
}

function check(name='',password=''){
  return new Promise((resolve,reject) =>{
    list(name,password).then(posts => {//if (err) reject(err);
      resolve(posts);
    }).catch(err => {reject(err);});
});
}

module.exports ={
  create,
  check
};
