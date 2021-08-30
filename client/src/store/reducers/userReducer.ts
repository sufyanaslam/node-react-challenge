import { ActionType } from "../action-types/index";
import { Action } from "../actions";
interface UserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface UserState {
  data: UserData[];
}
const INITIAL_STATE: UserState = {
  data: [],
};

const reducer = (state = INITIAL_STATE, action: Action): UserState => {
  switch (action.type) {
    case ActionType.SIGN_UP:
      return {
        ...state,
        data: [action.payload, ...state.data],
      };
    default:
      return state;
  }
};

export default reducer;
