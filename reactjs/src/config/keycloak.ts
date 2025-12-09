// src/config/keycloak.ts
const keycloakConfig = {
    url: "http://localhost:8080",
    realm: "demo-oauth",
    clientId: "react-client",
    redirectUri: "http://localhost:4173/callback",
};

export default keycloakConfig;