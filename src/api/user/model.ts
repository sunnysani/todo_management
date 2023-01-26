import { getModelForClass, prop, DocumentType, index, pre } from "@typegoose/typegoose";
import argon2 from "argon2";
import log from "../../utils/logger";

export const sensitiveFields = [
    "__v",
    "password"
]

@pre<User>("save", async function () {  
    this.password = await argon2.hash(this.password);;
    return;
})
@index({ email: 1 })
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email: string;

    @prop({ required: true, unique: true  })
    username: string;
  
    @prop({ required: true })
    public password: string;

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
          return await argon2.verify(this.password, candidatePassword);
        } catch (e) {
          log.error(e, "Could not validate password");
          return false;
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;