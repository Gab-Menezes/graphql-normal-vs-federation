import jwtDecode, { JwtPayload } from "jwt-decode";

class Auth {
    private _access_token = ""

    public get access_token(): string  {
        return this._access_token;
    }

    public set access_token(token: string) {
        this._access_token = token;
    }
    
    public isTokenValid() {  
        try {
            const {exp} = jwtDecode<JwtPayload>(this._access_token);
            if (!exp) return false;
            return (exp * 1000 > Date.now());
        } catch (error) {
            return false;
        }
    }

    public isTokenValidOrUndefined() {
        return this.isTokenValid() || this._access_token === "";
    }
}

export default new Auth();
