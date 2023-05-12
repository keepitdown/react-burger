import profileReducer, { initialState } from "./profile";
import { setProfileData, removeProfileData, setProfileEdited } from '../actions/profile';
import { testProfile } from "../../utils/test-data";

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle setProfileData', () => {
    expect(profileReducer(initialState, setProfileData(testProfile)))
      .toEqual({
        ...initialState,
        data: testProfile
      });
  });

  it('should handle removeProfileData', () => {
    expect(profileReducer({
      ...initialState,
      data: testProfile
    }, removeProfileData()))
      .toEqual(initialState);
  });

  it('should handle setProfileEdited', () => {
    expect(profileReducer(initialState, setProfileEdited(true)))
      .toEqual({ ...initialState, profileWasEdited: true });

    expect(profileReducer({ ...initialState, profileWasEdited: true }, setProfileEdited(false)))
      .toEqual({ ...initialState, profileWasEdited: false });
  });
});