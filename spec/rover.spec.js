const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  // Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(28389);
    expect(rover.position).toEqual(28389);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  // Test 8
  it("response returned by receiveMessage contains name of message", function() {
    /*Command --> Message --> Rover
    MESSAGE bundles COMMAND to send to ROVER 
    ROVER receives MESSAGE object and returns results*/
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('This is a new message.', commands);
    let rover = new Rover(message.commands.value);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('This is a new message.');
  });

  // Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    // expect(response).toContain('Test message with two commands');
    expect(response.results.length).toEqual(2);
  });

  // Test 10
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Responds correcty to the status check', commands);
    let rover = new Rover(4582);
    let response = rover.receiveMessage(message);
    expect(response.results.roverStatus).toBeTrue;
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
    expect(rover.position).toEqual(4582);
  });

  // Test 11
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Responds correctly to mode change', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.position).toEqual(98382);
    // check for completed property
  });

  // Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Responds with false when attempting to move in LOW_POWER mode', commands);
    let rover = new Rover(9838);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
    expect(response.results.completed).toBeFalse
    // check for completed property
  });

  // // Test 13
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 4321)];
    let message = new Message('Responds with position for move command', commands);
    let rover = new Rover(4321)
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(4321)
  });

});

