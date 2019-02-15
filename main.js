const SHA256 = require('crypto-js/sha256')

class Block {
  constructor(index, timestamp, data){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = "0";
    this.hash = this.calculateHash();
    this.nonce = this.generateNonce();
  }

  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + this.data + this.nonce).toString()
  }

  mineBlock(difficulty) {
    let difficultyStr = "";
    for(let i = 0; i < difficulty ; i++){
      difficultyStr+="0"
    }
    while(!(this.hash.substring(0,difficulty) === difficultyStr)){
      this.nonce = this.generateNonce();
      this.hash = this.calculateHash();
    }
  }

  generateNonce() {
    var text = "";
    var possible = "0123456789abcedf";
    for(let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
  }
}


class Blockchain {
  constructor(){
    this.chain = [this.createGenesis()];
    this.difficulty = 4;
  }

  createGenesis(){
    return new Block(0, "02/12/2019", "Genesis block", "0")
  }

  latestBlock(){
    return this.chain[this.chain.length-1]
  }

  addBlock(newBlock){
      newBlock.previousHash = this.latestBlock().hash;
      newBlock.mineBlock(this.difficulty);
      this.chain.push(newBlock);
  }

  checkValid(){
    for(let i = 1; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

      if(currentBlock.hash !== currentBlock.calculateHash()){
        return false;
      }
      if(currentBlock.previousHash !== previousBlock.hash){
        return false;
      }
    }

    return true;
  }
}

class Wallet {
  constructor() {
    this.privateKey = this.generatePrivateKey();
    this.publicKey = SHA256(this.privateKey);
    this.amount = 0;
  }

  generatePrivateKey(){
    var text = "";
    var possible = "0123456789abcedf";
    for(let i = 0; i < 64; i++) {
      text += possible.charAt(Math.floor(Math.random()*possible.length));
    }
    return text;
  }
}

let jsChain = new Blockchain();
jsChain.addBlock(new Block(1, "02/13/2019", {amount: 5}));
jsChain.addBlock(new Block(2, "02/14/2019", {amount: 10}));

console.log(JSON.stringify(jsChain, null, 4));
console.log("Is blockchain valid? " + jsChain.checkValid());
