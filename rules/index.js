const Auth = require("./auth.rules");
const Account = require("./account.rules");
const Email = require("./email.rules");
const Password = require("./password.rules");
const Role = require("./role.rules");
const Permission = require("./permission.rules");
const Subscription = require("./subscription.rules");
const { PaymentRules } = require("./payment.rules");
const Wallet = require("./wallet.rules");
const Security = require("./security.rules");
const Business = require("./business.rules");
const Creator = require("./creator.rules");
const Marketplace = require("./marketplace.rules");
const Content = require("./content.rules");
const Notification = require("./notification.rules");
const Audit = require("./audit.rules");
const Admin = require("./admin.rules");
const Api = require("./api.rules");
const Device = require("./device.rules");
const Feature = require("./feature.rules");
const Session = require("./session.rules");
const Privacy = require("./privacy.rules");
const Compliance = require("./compliance.rules");
const Report = require("./report.rules");
const Search = require("./search.rules");
const File = require("./file.rules");
const Storage = require("./storage.rules");
const Media = require("./media.rules");
const AI = require("./ai.rules");
const System = require("./system.rules");
const Verification = require("./verification.rules");

module.exports = {
  Auth,
  Account,
  Verification,
  Email,
  Password,
  Role,
  Permission,
  Subscription,
  Payment: PaymentRules,
  Wallet,
  Security,
  Business,
  Creator,
  Marketplace,
  Content,
  Notification,
  Audit,
  Admin,
  Api,
  Device,
  Feature,
  Session,
  Privacy,
  Compliance,
  Report,
  Search,
  File,
  Storage,
  Media,
  AI,
  System,
};