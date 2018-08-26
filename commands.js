const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput){
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      errorHandler(command);
      break;
  }
}

function errorHandler(command){
  done(command + ' is not a valid command');
}

const commandLibrary = {
  "echo": function(userInput){
    done(userInput);
  },
  "cat": function(fullPath){
          const fileName = fullPath[0];
          fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            done(data);
          });
  },
  "head": function(fullPath){
           const fileName = fullPath[0];
           fs.readFile(fileName,'utf8', (err, data) => {
             if(err) throw err;
             let lineArr = data.split('\n');
             done(lineArr.splice(0,7).join('\n'))
           })
  },
  "tail": function(fullPath){
            const fileName = fullPath[0];
            fs.readFile(fileName,'utf8', (err, data) => {
              if(err) throw err;
              let lineArr = data.split('\n');
              let lineArrLength = lineArr.length;
              done(lineArr.splice(lineArrLength-7, lineArrLength-1).join('\n'))
            })
  }
};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
