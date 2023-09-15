import { createStore, persist } from "easy-peasy";
import storeModel from "../model"

const store = createStore(persist(storeModel));
export { store };
export default store;
