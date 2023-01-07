const ethers = require("ethers");
const MessagePortal = artifacts.require("MessagePortal");

contract("messagePortal", () => {
  let messagePortal;

  beforeEach(async () => {
    messagePortal = await MessagePortal.new();
  });

  it("should send a message and update totalmessages and messages array", async () => {
    // First, get the initial values of totalmessages and messages
    const initialTotalMessages = await messagePortal.getTotalMessages();
    const initialMessages = await messagePortal.getAllMessages();

    // Send a message
    const message = "Hello, world!";
    await messagePortal.sendMessage(message);

    // Get the updated values of totalmessages and messages
    const updatedTotalMessages = await messagePortal.getTotalMessages();
    const updatedMessages = await messagePortal.getAllMessages();

    // Verify that totalmessages was incremented by 1
    assert.equal(
      updatedTotalMessages,
      initialTotalMessages + 1,
      "Total messages was not incremented correctly"
    );

    // Verify that a new message with the correct values was added to the messages array
    assert.equal(
      updatedMessages.length,
      initialMessages.length + 1,
      "Messages array was not updated correctly"
    );
    assert.equal(
      updatedMessages[updatedMessages.length - 1].messageSender,
      messageSender,
      "Message sender is incorrect"
    );
    assert.equal(
      updatedMessages[updatedMessages.length - 1].message,
      message,
      "Message is incorrect"
    );
    assert.isAbove(
      updatedMessages[updatedMessages.length - 1].timestamp,
      0,
      "Timestamp is incorrect"
    );
  });
});
