// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title NFT smart contract
 * @author Bhupesh Dubey
 */
contract RewardNft is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    /* Constructor initializes RewardNft token * */
    constructor() ERC721("RewardNft", "RNT") { }

    /**
        @dev rewards NFT to specific address
        @param to address of receiver
        @param uri NFT metadata uri
     */
    function reward(
        address to,
        string memory uri
    ) public onlyOwner {
         _tokenIds.increment();
         uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, uri);
    }

}
