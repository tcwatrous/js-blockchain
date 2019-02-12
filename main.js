const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(timestamp, data){
    this.index = 0;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString();
  }

  mineBlock(difficulty) {

  }
}
