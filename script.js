var chat = $("#chat"), messageINP = $("#message"), sound = "pin1.mp3";

// <brain>
// THIS IS A BRAIN OF BOT
var topicJSON = [{ask:"hi", ans:["🙏🏻", "👋🏻"]},
                 {ask:"hello", ans:["Hi ;)"]},
                 {ask:"developer", ans:["RANJITH"]},
                 {ask:"owner", ans:["RANJITH"]},
                 {ask:"boss", ans:["RANJITH"]},
                 {ask:"him", ans:["Him? Who?"]},
                 {ask:"how are you?", ans:["Good, and you?"]},
                 {ask:"paper", ans:["rock", "scissors"]},
                 {ask:"rock", ans:["paper", "scissors"]},
                 {ask:"scissors", ans:["paper", "rock"]},
                 {ask:"tic", ans:["tac toe"]}
                ];
// </brain>

function renderAvaiable(){
  let html = "";
  for(let i=0; i<topicJSON.length; i++){
    if(i != 0){
      html += ", ";
    }
    html += topicJSON[i].ask;
  }

  $("#avaiable").text(html);
}
renderAvaiable();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function answer(){
  console.clear();
  //Find topic in main JSON
  let lastMeMessage = chat.find(".me:last").text();

  console.log("Last Message from Me: " + lastMeMessage);

  let regTopic = new RegExp(lastMeMessage, "gmi");
  let topicSel = null;

  for(let i=0; i<topicJSON.length; i++){
    if( regTopic.test( topicJSON[i].ask ) ){
      console.log(`${topicJSON[i].ask} is the same like ${lastMeMessage}`);
      topicSel = i;
      break;
    }
    else{
      console.log(`${topicJSON[i].ask} is NOT the same like ${lastMeMessage}`);
    }
  }

  console.log("Founded matching topic ask: ");
  console.log(topicSel);

  //Find answer in selected JSON
  if(topicSel != null){
    let selectedAnswers = topicJSON[ topicSel ]['ans'];
    let finAnswer = selectedAnswers[ getRandomInt(0, selectedAnswers.length-1) ];

    sendMessage(finAnswer ,"bot");
  }
  else{
    sendMessage("I don't know what you want :/" ,"bot");
  }

}

function checkChat(){
  setTimeout(function(){
    answer();
  }, 1000);
}

function sendMessage(mes, who){
  if(who == "bot"){
    chat.append(`<div class="card bg-light border-0 shadow-sm p-0 mb-3"><div class="card-body"><p class="mb-0 ${who}">${mes}</p></div></div>`);
  }
  else{
    chat.append(`<div class="card text-white bg-primary border-0 shadow-sm p-0 mb-3"><div class="card-body"><p class="mb-0 ${who}">${mes}</p></div></div>`);
  }

  let audio = new Audio(sound).play();

  if(who == "me") checkChat();
}

function getMessageInput(){
  messageINP.val( messageINP.val().replace(/^\s+|\s+$/g,'')  );

  if(messageINP.val() == "") return;
  sendMessage( messageINP.val(), "me" );
  messageINP.val("");
}

messageINP.on("keydown", function(e){
  if(e.keyCode == 13){
    getMessageInput()
  }
});

$("#send").on("click", function(){
  getMessageInput();
});
