import { createStore } from "vuex";
import user from "./modules/user";
import auth from "./modules/auth";

const debug = import.meta.env.NODE_ENV !== "production";
const store = createStore({
  modules: {
    user,
    auth,
  },
  strict: debug,
});
export default store;
