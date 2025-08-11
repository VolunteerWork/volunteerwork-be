import winston from "winston";

const logger = winston.createLogger({
          level: "info",
          format: winston.format.combine(
                    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                    winston.format.printf(({ level, message, timestamp }) => {
                      return `[${timestamp}] ${level.toUpperCase()} '${message}'`;
                    })
          ),
          transports: [
            new winston.transports.Console()
          ],
});

export function embbedLoggerToSystemLog(){
          console.log = (...args) => logger.info(args.join(" "));
          console.error = (...args) => logger.error(args.join(" "));
          console.warn = (...args) => logger.warn(args.join(" "));
          console.debug = (...args) => logger.debug(args.join(" "));

          process.on("uncaughtException", (err) => {
                    logger.error("Uncaught Exception", { message: err.message, stack: err.stack });
          });
          process.on("unhandledRejection", (reason, promise) => {
                    logger.error("Unhandled Rejection", { reason, promise });
          });
          process.on("warning", (warning) => {
                    logger.warn("Node.js Warning", { message: warning.message, stack: warning.stack });
          });                            
}