import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

// fetch posts
export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts')

    // dispatch with thunk
    dispatch({ type: 'FETCH_POSTS', payload: response.data})
};

// fetch users
export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`users/${id}`);

    dispatch({ type: 'FETCH_USER', payload: response.data })
}
// Memoization Example
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// // one time memoization
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`)

//     dispatch({type: 'FETCH_USER', payload: response.data})
// });

/* 
* function fetchPostsAndUsers:
* call fetchPosts
* get list of posts
* find all unique userId's from list of posts
* iterate over userId's
* call fetchUser with each userId
*
* leave the separate actions above for sacalabitlity and reusability
*/
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // userIds.forEach(id => dispatch(fetchUser(id)));
    // use lodash chain instead; see README for mor info
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};