export class EnvironmentConfig {
  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly DB_HOST: string;
  readonly DB_PORT: number;
  readonly DB_USERNAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_NAME: string;
  readonly SYNCHRONIZE: boolean;
  readonly LOGGING: boolean;
  readonly PASSWORD_DEFAULT: string;
  readonly JWT_SECRET: string;
  readonly JWT_EXPIRES_IN: string;
  readonly REDIS_URL: string;
  readonly CRON_NOTIFICATION: string
  readonly CRON_MENSALITY: string

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.PORT = parseInt(process.env.PORT || "3000", 10);
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_PORT = parseInt(process.env.DB_PORT || "5432", 10);
    this.DB_USERNAME = process.env.DB_USERNAME || "user";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "password";
    this.DB_NAME = process.env.DB_NAME || "myapp";
    this.SYNCHRONIZE = process.env.SYNCHRONIZE === "true" || false;
    this.LOGGING = process.env.LOGGING === "true" || false;
    this.PASSWORD_DEFAULT = process.env.PASSWORD_DEFAULT || "123";
    this.JWT_SECRET = process.env.JWT_SECRET || "";
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "3h";
    this.REDIS_URL = process.env.REDIS_URL || "";
    this.CRON_NOTIFICATION = process.env.CRON_NOTIFICATION || ""
    this.CRON_MENSALITY = process.env.CRON_MENSALITY || ""
  }
}
