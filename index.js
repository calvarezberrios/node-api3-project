// code away!
require("dotenv").config();
const server = require("./server.js");


const PORT = process.env.PORT;
server.listen(PORT, () => console.log("Server listening on port:", PORT));
