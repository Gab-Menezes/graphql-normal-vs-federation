import { sign } from "jsonwebtoken";
import { User } from "../graphql/types/User/User";
import { resType } from "../types/ContextTypes";

export function createAccessToken(user: User): string {
    return sign({ userId: user.id }, process.env.SECRET_TOKEN, {
        expiresIn: "15m"
    });
}

export function createRefreshToken(user: User): string {
    return sign({ userId: user.id, tokenVersion: user.token_version }, process.env.SECRET_REFRESH, {
        expiresIn: "7d"
    });
}

export function sendRefreshToken(res: resType, token: string): void {
    res.setCookie(
        "refresh_token", token, { httpOnly: true, path: "/refresh_token" }
    );
}

export function clearRefreshToken(res: resType): void {
    res.clearCookie("refresh_token",  { httpOnly: true, path: "/refresh_token" });
}
