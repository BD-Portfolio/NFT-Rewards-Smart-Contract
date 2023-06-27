const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reward NFT test : ", async () => {

    let reward;

    before(async () => {
        [firstUser,] = await ethers.getSigners();
        console.log(`Deploying contracts with the account :- ${firstUser.address}`);
    });

    // ----------------------------- Deploying contract -----------------------------------

    it("Should deploy Reward NFT contract", async function () {
        const RewardContract = await ethers.getContractFactory("RewardNft");
        reward = await RewardContract.deploy();
        await reward.deployed();
        console.log(`Reward NFT contract deployed at :- ${reward.address}`);
    });

    // ----------------------------- Test functionalities -----------------------------------

    it("Should fetch NFT name as RewardNft", async function () {
        const result = await reward.name();
        expect(result).to.be.equal("RewardNft");
    });

    it("Should fetch NFT symbol as RNT", async function () {
        const result = await reward.symbol();
        expect(result).to.be.equal("RNT");
    });

    it("Should fetch contract owner", async function () {
        const result = await reward.owner();
        expect(result).to.be.equal(firstUser.address);
    });

    it(`Should fetch balance as 0`, async function () {
        const result = await reward.balanceOf(firstUser.address);
        expect(result).to.be.equal("0");
    });

    it("Should mint a new NFT as a reward", async function () {
        const result = await reward.reward(firstUser.address, "https://test/data");
        const receipt = await result.wait();
        const events = receipt.events?.filter((x) => { return x.event == "Transfer" });
        expect(events[0].event).to.be.equal("Transfer");
    });

    it(`Should fetch balance as 1`, async function () {
        const result = await reward.balanceOf(firstUser.address);
        expect(result).to.be.equal("1");
    });

});