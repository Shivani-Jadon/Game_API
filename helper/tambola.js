const Ticket = require("../models/ticket");

module.exports.uniqueTicket = function(){
    let ticketArray = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ];

    for(let i=0; i<3; i++){
        let count = 0;
        while(count < 5){
            let index = Math.floor(Math.random() * 9);

            if(ticketArray[i][index] == 0){
                ticketArray[i][index] = Math.floor(Math.random() * 100) * 1;
                count++;
            }
        }
    }

    return ticketArray;
};

module.exports.luckyNum = function(numberArray){

    let n = Math.floor(Math.random()*100) + 1;
    while(numberArray.includes(n)){
        n = Math.floor(Math.random()*100) + 1;
    }
    return n;
}