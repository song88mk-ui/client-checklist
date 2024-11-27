const hasValue = (obj: object): boolean => {
	if (Array.isArray(obj)) {
		return obj.some((item) => hasValue(item));
	} else if (typeof obj === 'object' && obj !== null) {
		return Object.values(obj).some((value) => hasValue(value));
	} else {
		return Boolean(obj);
	}
};

export default hasValue;
