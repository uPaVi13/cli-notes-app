const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

let command = yargs.argv._[0];
let parameters = yargs.argv;

let notesList = {
  title: parameters.title,
  body: parameters.body
};

let obj = [];
let flag = 0;

switch(command) {
  case 'add':
      fs.readFile('./notes.json', 'utf8', function(err, data) {
      if(err) throw err;
      if(data) {
        obj = JSON.parse(data);
      }
      else {
        obj = [];
      }
      for (let i = 0; i < obj.length; i++) {
        if(obj[i].title === notesList.title) {
          flag = 1;
          console.log(chalk.bgRed('!!!Title Already Taken!!!'));
        }
      }
      if(!flag) {
        obj.push(notesList);
        console.log(chalk.bgGreenBright.black('New Note Created!'));
      }
      fs.writeFileSync('./notes.json', JSON.stringify(obj));
    });
    break;

  case 'list':
    fs.readFile('./notes.json', 'utf8', function(err, data) {
      if(err) throw err;
      if(data) {
        obj = JSON.parse(data);
      }
      else {
        obj = [];
      }
      if(obj.length === 0) {
        console.log(chalk.bgRed('!!!Nothing To Show!!!'));
      } else {
        console.log(chalk.bgYellowBright.black.bold('YOUR NOTES: '));
        for (let i = 0; i < obj.length; i++) {
          console.log(chalk.greenBright(obj[i].title));
        }
      }
    });
    break;

    case 'read':
      fs.readFile('./notes.json', 'utf8', function(err, data) {
      if(err) throw err;
      if(data) {
        obj = JSON.parse(data);
      }
      else {
        obj = [];
        console.log(chalk.bgRed('!!!Nothing To Show!!!'));
      }
      for (let i = 0; i < obj.length; i++) {
        if(obj[i].title === parameters.title) {
          flag = 0;
          console.log(chalk.bgYellowBright.black.bold(obj[i].title + ":"));
          console.log(chalk.greenBright(obj[i].body));
          break;
        }
        else {
          flag = 1;
        }
      }
      if(flag || obj.length === 0) {
        console.log(chalk.bgRed('!!!Note Not Found!!!'));
      }
      });
      break;

  case 'remove':
    fs.readFile('./notes.json', 'utf8', function(err, data) {
      if(err) throw err;
      if(data) {
        obj = JSON.parse(data);
      }
      else {
        obj = [];
      }
      let index = null;
      for (let i = 0; i < obj.length; i++) {
        if(obj[i].title === parameters.title) {
          flag = 1;
          index = i;
          break;
        }
        else {
          flag = 0;
        }
      }
      if(flag) {
        obj.splice(index, 1);
        console.log(chalk.bgGreenBright.black('Note Removed!'));
        fs.writeFileSync('./notes.json', JSON.stringify(obj));
      } else {
          console.log(chalk.bgRed('!!!Note Not Found!!!'));
        }
    });
    break;

  default:
    console.log(chalk.bgRed('!!!Enter Valid Command!!!'));
    break;
}







