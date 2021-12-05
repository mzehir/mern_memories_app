import { AUTH, SIGNUP_FAIL } from "../constants/actionsConstants";

export default (state = { userData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, userData: action.payload };

    case SIGNUP_FAIL:
      return { error: action.payload };

    default:
      return state;
  }
};
