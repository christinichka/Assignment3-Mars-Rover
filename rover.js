class Rover {
  constructor(position, mode='NORMAL', generatorWatts=110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }
  // function outside of constructor to handle updates of its properties
    /* response returned by receiveMessage contains name of message
    message is an object
    results is an array of results that corresponds to one Command in message.commands*/
  receiveMessage(message) {
    let response = {
      message: message.name,
      results: []
    };
    
    for (let i = 0; i < (message.commands).length; i++) {
      if (message.commands[i].commandType === 'MOVE') {
        
        if (this.mode === 'NORMAL') { 
        this.mode = message.commands[i].value;
        this.position = message.commands[i].value;
        response.results.push({completed: true});
        
        } else if(this.mode === 'LOW_POWER') {
        response.results.push({completed: false});

      } else if (message.commands[i].commandType === 'MODE_CHANGE') {
        if (this.mode === 'NORMAL') {
          this.mode = 'NORMAL'
        } else {
          this.mode = 'LOW_POWER';
          response.results.push({completed: true});
        }
            
      } else if (message.commands[i].commandType === 'STATUS_CHECK') {
        response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
      
      } else {
        response.results.push({completed: false});
      }
    }; 
    return response;   
     
  }
  
}
}

module.exports = Rover;
