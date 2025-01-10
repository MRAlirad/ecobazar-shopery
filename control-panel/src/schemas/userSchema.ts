export default interface UserSchema {
	_id: string;
	name: string;
	email: string;
}

export type SignupInputs = {
	name: string;
	email: string;
	password: string;
};
