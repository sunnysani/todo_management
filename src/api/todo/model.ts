import { Ref, getModelForClass, prop } from "@typegoose/typegoose"
import { User } from "../user/model";

export class Todo {
    @prop({ ref: () => User, required: true })
    user: Ref<User>;

    @prop({ required: true })
    description: string;

    @prop({ default: false })
    statusDone: boolean;
}

const TodoModel = getModelForClass(Todo);

export default TodoModel;