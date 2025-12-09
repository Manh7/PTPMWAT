import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import keycloakConfig from "@/config/keycloak";
import { useDispatch } from "react-redux";

const KeycloakCallback: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const { url, realm, clientId, redirectUri } = keycloakConfig;

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const error = params.get("error");

        if (error) {
            console.error("Keycloak error:", error);
            return;
        }

        if (!code) {
            console.error("No code found in callback");
            return;
        }

        const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
        if (!codeVerifier) {
            console.error("No PKCE code_verifier found");
            return;
        }

        const body = new URLSearchParams({
            grant_type: "authorization_code",
            client_id: clientId,
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        });

        fetch(`${url}/realms/${realm}/protocol/openid-connect/token`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString()
        })
            .then(res => res.json())
            .then(data => {
                console.log("Token response:", data);

                if (data.access_token) {
                    localStorage.setItem("kc_access_token", data.access_token);

                    // TODO: tùy bạn → có thể fetch /auth/account hoặc navigate trực tiếp
                    window.location.href = "/";
                } else {
                    console.error("No access token returned");
                }
            })
            .catch(e => console.error("Error exchanging code:", e));
    }, [navigate]);

    return <div>Đang đăng nhập bằng Keycloak...</div>;
};

export default KeycloakCallback;
