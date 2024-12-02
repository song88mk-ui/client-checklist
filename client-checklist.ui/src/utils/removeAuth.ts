import { LocalStorage } from '$lib/storage';
import auth from '$stores/auth';

const removeAuth = () => {
	auth.set(null);
	LocalStorage.removeValue('userToken');
	LocalStorage.removeValue('accessType');
	LocalStorage.removeValue('username');
}

export default removeAuth;