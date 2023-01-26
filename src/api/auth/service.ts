import { DocumentType } from "@typegoose/typegoose";
import { User, sensitiveFields } from "../user/model";
import { omit } from "lodash";
import { signJwt } from "../../utils/jwt";
import SessionModel from "./model";

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
    return SessionModel.findById(id);
}

export function signAccessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), sensitiveFields);
  
    const accessToken = signJwt(payload, "accessTokenPrivateKey", {
        expiresIn: "15m",
    });
  
    return accessToken;
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId,
    });
  
    const refreshToken = signJwt(
        {
            session: session._id,
        },
            "refreshTokenPrivateKey",
        {
            expiresIn: "1y",
        }
    );
  
    return refreshToken;
}

export async function removeSessionById(id: string) {
    SessionModel.deleteOne({ id: id });
}
