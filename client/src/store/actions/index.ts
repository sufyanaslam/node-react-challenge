import { ActionType } from "../action-types/index";

interface SignedUpAction {
  type: ActionType.SIGN_UP;
  payload: any;
}

export type Action = SignedUpAction;
