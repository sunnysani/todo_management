import UserModel, { User } from "./model";

export function createUser(input: Partial<User>) {
    return UserModel.create(input);
}

export function findUserById(id: string) {
    return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
    return UserModel.findOne({ email });
}