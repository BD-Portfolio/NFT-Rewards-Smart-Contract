const hre = require("hardhat");

async function main() {

    // fetch different accounts
    [firstUser,] = await ethers.getSigners();
    console.log(`Deploying contract with the account :- ${firstUser.address}`);

    // deploy RewardNft contract
    const RewardContract = await hre.ethers.getContractFactory("RewardNft");
    const Reward = await RewardContract.deploy("RewardNft", "RNT");
    await Reward.deployed();
    console.log(`Reward NFT contract deployed at :- ${Reward.address}`);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });