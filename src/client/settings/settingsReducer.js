import * as settingsTypes from './settingsActions';
import * as authTypes from '../auth/authActions';
import { rewardsValues } from '../../common/constants/rewards';

const initialState = {
  locale: 'auto',
  votingPower: 'auto',
  votePercent: 10000,
  showNSFWPosts: false,
  loading: false,
  upvoteSetting: true,
  rewardSetting: rewardsValues.half,
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_SUCCESS:
    case authTypes.RELOAD_SUCCESS:
      if (action.meta && action.meta.refresh) return state;
      if (action.payload.user_metadata && action.payload.user_metadata.settings) {
        const {
          locale,
          votingPower,
          votePercent,
          showNSFWPosts,
          upvoteSetting,
          rewardSetting,
        } = action.payload.user_metadata.settings;
        return {
          ...state,
          locale: locale || initialState.locale,
          votingPower: votingPower || initialState.votingPower,
          votePercent: votePercent || initialState.votePercent,
          showNSFWPosts: showNSFWPosts || initialState.showNSFWPosts,
          upvoteSetting: typeof upvoteSetting === 'boolean' ? upvoteSetting : initialState.upvoteSetting,
          rewardSetting: rewardSetting || initialState.rewardSetting,
        };
      }
      return state;
    case settingsTypes.SAVE_SETTINGS_START:
      return {
        ...state,
        loading: true,
      };
    case settingsTypes.SAVE_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        locale: action.payload.locale,
        votingPower: action.payload.votingPower,
        votePercent: action.payload.votePercent,
        showNSFWPosts: action.payload.showNSFWPosts,
        upvoteSetting: action.payload.upvoteSetting,
        rewardSetting: action.payload.rewardSetting,
      };
    case settingsTypes.SAVE_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default settings;

export const getIsLoading = state => state.loading;
export const getLocale = state => state.locale;
export const getVotingPower = state => state.votingPower;
export const getVotePercent = state => state.votePercent;
export const getShowNSFWPosts = state => state.showNSFWPosts;
export const getUpvoteSetting = state => state.upvoteSetting;
export const getRewardSetting = state => state.rewardSetting;
