const express = require("express");

const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);
const MERKLE_ROOT = merkleTree.getRoot();
console.log(MERKLE_ROOT);

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;

  // find the proof that norman block is in the list
  const name = body.name;
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  console.log(name, isInTheList);
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
