const main = async () => {
  const messagePortalContract = await hre.ethers.getContractFactory(
    "MessagePortal"
  );
  const messageContract = await messagePortalContract.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await messageContract.deployed();
  console.log("Contract addy:", messageContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  /*
   * Let's try two waves now
   */

  const account1PrivateKey =
    "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e";
  const account1Wallet = new ethers.Wallet(account1PrivateKey);

  const waveTxn = await messageContract.sendMessage("This is SendMessage #1");
  await waveTxn.wait();

  const waveTxn2 = await messageContract.sendMessage("This is SendMessage #2");
  await waveTxn2.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    messageContract.address
  );
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let allMessages = await messageContract.getAllMessages();
  console.log(allMessages);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
