import * as ActionTypes from './ActionTypes';

export const comments = (state = { errMess: null, comments:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {...state, errMess: null, comments: action.payload};

    case ActionTypes.COMMENTS_FAILED:
      return {...state, errMess: action.payload};

    case ActionTypes.ADD_COMMENT: {
      const commentId = state.comments.length
      action.payload.id = commentId
      const comments = state.comments.concat(action.payload)
      return { ...state, errMess: null, comments: comments }
    }
    default:
      return state;
  }
};