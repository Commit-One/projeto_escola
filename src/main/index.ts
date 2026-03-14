import "dotenv/config";
import "reflect-metadata";
import "./register";
import { ServerInitializer } from "./server";

new ServerInitializer().inicialize();
