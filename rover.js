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
    let results = [];
    let response = {
      message: message.name,
    }
    return response;
     
  }
  
}

module.exports = Rover;