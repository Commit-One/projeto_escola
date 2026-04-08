import { container } from "tsyringe";
import { DisabledUserWorker } from "../infrastructure/worker/disabledUser.worket";

export const startWorkers = () => {
  container.resolve(DisabledUserWorker).start();
};
