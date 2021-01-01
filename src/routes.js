import Dashboard from "views/Dashboard/index.js";
import Users from "views/Users/index.js";
import SingleUser from "views/SingleUser/index.js";
import Coins from "views/Coins/index.js";
import Pairs from "views/Pairs/index.js";
import Wallets from "views/Wallets/index.js";
import Contacts from "views/Contacts/index.js";
import Settings from "views/Settings/index.js";
import MultiWallet from "views/MultiWallet/index.js";


var routes = [
  {
    layout: "/home",
    path: "/",
    component: Dashboard,
    hidden: true,
  },
  {
    layout: "/home",
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    icon: "tim-icons icon-chart-pie-36",
  },
  {
    layout: "/home",
    path: "/users",
    name: "Users",
    component: Users,
    icon: "tim-icons icon-badge",
  },
  {
    layout: "/home",
    path: "/coins",
    name: "Coins",
    component: Coins,
    icon: "tim-icons icon-coins",
  },
  {
    layout: "/home",
    path: "/pairs",
    name: "Pairs",
    component: Pairs,
    icon: "tim-icons icon-molecule-40",
  },
  {
    layout: "/home",
    path: "/multiwallets",
    name: "Multi Wallet",
    component: MultiWallet,
    icon: "tim-icons icon-credit-card",
  },
  {
    layout: "/home",
    path: "/wallets",
    name: "Admin Wallets",
    component: Wallets,
    icon: "tim-icons icon-wallet-43",
  },
  {
    layout: "/home",
    path: "/contact",
    name: "Contacts",
    component: Contacts,
    icon: "tim-icons icon-mobile",
  },
  {
    layout: "/home",
    path: "/settings",
    name: "Admin Settings",
    component: Settings,
    icon: "tim-icons icon-settings-gear-63",
  },
  {
    layout: "/home",
    path: "/singleUser",
    component: SingleUser,
    hidden: true,
  },
];

export default routes;
