import userService from '../../services/userService';

export const getUsersAsync = async ({ commit }) => {
    let response = await userService.getUsersAsync();
    commit('updateUserData', response.data);
};