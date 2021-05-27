import axios from 'axios';
import userStore from '../store';

export default {
    async getUsersAsync () {
        const source = axios.CancelToken.source();
        userStore.commit('user/addRequest', source.cancel);

        return axios({
            method: 'get',
            url: 'https://reqres.in/api/users?delay=2',
            cancelToken: source.token
        });
    }
}