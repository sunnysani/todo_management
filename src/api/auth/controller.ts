import { Request, Response } from "express";
import { findUserByEmail, findUserById } from "../user/service";
import { CreateSessionInput } from "./schema";
import { findSessionById, signAccessToken, signRefreshToken } from "./service";
import { verifyJwt } from "../../utils/jwt";
import { get } from "lodash";

export async function createSessionHandler(
    req: Request<{}, {}, CreateSessionInput>,
    res: Response
) {
    const failMessage = "Invalid email or password";
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.send(failMessage);
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
        return res.send(failMessage);
    }

    // sign a access token
    const accessToken = signAccessToken(user);

    // sign a refresh token
    const refreshToken = await signRefreshToken({ userId: user._id });

    // send the tokens

    return res.send({
        accessToken,
        refreshToken,
    });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = req.header("x-refresh");

    if (refreshToken === undefined) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const decoded = verifyJwt<{ session: string }>(
      refreshToken,
      "refreshTokenPublicKey"
    );
  
    if (!decoded) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const session = await findSessionById(decoded.session);
  
    if (!session || !session.valid) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const user = await findUserById(String(session.user));
  
    if (!user) {
      return res.status(401).send("Could not refresh access token");
    }
  
    const accessToken = signAccessToken(user);
  
    return res.send({ accessToken });
}
