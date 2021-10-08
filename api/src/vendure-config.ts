import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import path from "path";
import { NodemailerEmailSender } from "./customSenderEmail";
export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    adminApiPlayground: {
      settings: {
        "request.credentials": "include",
      } as any,
    }, // turn this off for production
    adminApiDebug: true, // turn this off for production
    shopApiPath: "shop-api",
    shopApiPlayground: {
      settings: {
        "request.credentials": "include",
      } as any,
    }, // turn this off for production
    shopApiDebug: true, // turn this off for production
  },
  authOptions: {
    superadminCredentials: {
      identifier: "leobar37",
      password: "alfk123",
    },
    tokenMethod: "bearer",
  },
  dbConnectionOptions: {
    type: "better-sqlite3",
    synchronize: true, // turn this off for production
    logging: false,
    database: path.join(__dirname, "../vendure.sqlite"),
    migrations: [path.join(__dirname, "../migrations/*.ts")],
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
    }),
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    EmailPlugin.init({
      devMode: true,
      emailSender: new NodemailerEmailSender(),
      transport: {
        raw: true,
        type: "file",
        outputPath: path.join(__dirname, "../static/email/test-emails"),
      },

      outputPath: path.join(__dirname, "../static/email/test-emails"),
      route: "mailbox",
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../static/email/templates"),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation
        fromAddress: '"example" <ndoreply@example.com>',
        verifyEmailAddressUrl: "http://localhost:4201",
        passwordResetUrl: "http://localhost:4201//password-reset",
        changeEmailAddressUrl:
          "http://localhost:4201//verify-email-address-change",
      },
    }),
    AdminUiPlugin.init({
      route: "admin",
      port: 3002,
    }),
  ],
};
