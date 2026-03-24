import pino from "pino";
import fs from "fs";
import path from "path";

const logDir = path.resolve("logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logFilePath = path.join(logDir, "app.log");

const stream = pino.destination({
  dest: logFilePath,
  sync: true,
});

export const logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
    timestamp: pino.stdTimeFunctions.isoTime,
    base: undefined,
    formatters: {
      level(label) {
        return { level: label };
      },
    },
  },
  stream,
);
