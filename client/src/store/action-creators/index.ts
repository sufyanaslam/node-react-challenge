import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions/index";

export const signedUp = (amount: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SIGN_UP,
      payload: amount,
    });
  };
};
