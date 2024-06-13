const axios = require("axios");

const serverUrl = "http://localhost:1225";

const name = process.argv[2] || "Default";

async function main() {
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: name,
  });

  console.log({ gift });
}

main();
