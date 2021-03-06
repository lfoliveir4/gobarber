import { createConnections } from "typeorm";

createConnections().then((response) => console.log(response));
