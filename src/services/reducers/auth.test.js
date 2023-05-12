import authReducer, { initialState } from "./auth";
import { setAuthCheckStatus, setLoggedInStatus, setFormSubmitStatus, setFormFailStatus } from '../actions/auth';
import { login, recover, reset } from "../../utils/constants";

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle setAuthCheckStatus', () => {
    expect(authReducer(initialState, setAuthCheckStatus(true)))
      .toEqual({ ...initialState, authIsChecked: true });

    expect(authReducer({ ...initialState, authIsChecked: true }, setAuthCheckStatus(false)))
      .toEqual({ ...initialState, authIsChecked: false });
  });

  it('should handle setLoggedInStatus', () => {
    expect(authReducer(initialState, setLoggedInStatus(true)))
      .toEqual({ ...initialState, userIsLoggedIn: true });

    expect(authReducer({ ...initialState, userIsLoggedIn: true }, setLoggedInStatus(false)))
      .toEqual({ ...initialState, userIsLoggedIn: false });
  });

  it('should handle setFormSubmitStatus', () => {
    expect(authReducer(initialState, setFormSubmitStatus(recover, true)))
      .toEqual({
        ...initialState,
        forms: {
          ...initialState.forms,
          recover: { ...initialState.forms.recover, isSubmitted: true }
        }
      });

    expect(authReducer({
      ...initialState,
      forms: {
        ...initialState.forms,
        reset: { ...initialState.forms.reset, isSubmitted: true }
      }
    }, setFormSubmitStatus(reset, false)))
      .toEqual({
        ...initialState,
        forms: {
          ...initialState.forms,
          reset: { ...initialState.forms.reset, isSubmitted: false }
        }
      });
  });

  it('should handle setFormFailStatus', () => {
    expect(authReducer(initialState, setFormFailStatus(login, true)))
      .toEqual({
        ...initialState,
        forms: {
          ...initialState.forms,
          login: { ...initialState.forms.login, hasFailed: true }
        }
      });

    expect(authReducer({
      ...initialState,
      forms: {
        ...initialState.forms,
        reset: { ...initialState.forms.reset, hasFailed: true }
      }
    }, setFormFailStatus(reset, false)))
      .toEqual({
        ...initialState,
        forms: {
          ...initialState.forms,
          reset: { ...initialState.forms.reset, hasFailed: false }
        }
      });
  });
});