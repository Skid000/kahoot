const Kahoot = require("kahoot.js-updated");
const { parentPort } = require("worker_threads");
function kahoot(arr) {
  var amount = arr[0];
  var code = arr[1];
  var name = arr[2];
  if (amount === 'kill') {
    console.log("\nworker killed");
    process.exit(0);
  }
  for (var i = 1; i <= amount; i++) {
    let e = i;
    setTimeout(function() {
      let client = new Kahoot();

      client.join(code, Math.random().toString(36).substring(7)).catch(err => {console.warn(err)})

      client.on("QuestionStart", question => {
        //console.log(JSON.stringify(question));
          setTimeout(function() {
            
              question.answer(Math.floor(Math.random() * question.numberOfChoices)).catch(err => {})
              //console.log(`#${e} answered | Thread ${name}`)
          }, e * 15);
      });

          //console.log("Joining kahoot... #" + e + '/' + amount + `Thread: ${name}`);
      }, e * 25);
  }
}
parentPort.on('message', function(arr) {
  kahoot(arr)
});
