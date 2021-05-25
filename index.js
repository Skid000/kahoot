const readline = require("readline");
const { Worker } = require("worker_threads");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startWorkers(e) {
  var c = [Math.floor(e[0] / e[2]),e[1]]
  while(e[2] != 0){
    var arr = [c[0],c[1],e[2]];
      var worker1 = new Worker(__dirname + "/worker.js");
      worker1.postMessage(arr);
      e[2] = e[2] - 1;
  }
}

rl.question("Game code:  ", function(code) {
    rl.question("Amount of bots: ", function(amount) {
        rl.question('Threads: ', function(e){
            var arr = [amount, code,e]
          startWorkers(arr);
        })
        
    });
});

rl.on("close", function() {
    var arr = ['kill', null, null]
    startWorkers(arr);
    console.log("\nkilled");
});
