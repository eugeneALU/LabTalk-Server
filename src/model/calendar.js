const fs = require('fs');
const uuid = require('uuid/v4');
const moment =require('moment');

function select_group(filterID =''){
  return new Promise((resolve,reject) => {
      if(!fs.existsSync('calendar.json')){ //create calendar.json if not create
          fs.writeFileSync('calendar.json', '');
      }

      fs.readFile('calendar.json', 'utf8', (err, data) => {
        if(err) reject(err);

        let posts= data ? JSON.parse(data): [];
        if (filterID){
          posts = posts.filter(p =>{
            return (p.group_id.indexOf(filterID) !== -1);
          });
        }
        resolve(posts);
      });
  }
);
}

function create(newtitle,newtime,newdata,group_id,day){
  return new Promise((resolve, reject) => {
    const newActivity = {
      group_id: group_id ,
      title: newtitle,
      time: newtime,
      data: newdata,
      day: day
    };

    select_group().then(posts => {
      if(posts == '') {posts=[newActivity];}
      else {posts =[newActivity, ...posts];}
    fs.writeFile('calendar.json',JSON.stringify(posts),err =>{
      if(err) reject(err);

      resolve(newActivity);
      });
    });
  });
}


module.exports ={
  create,
  select_group
};