import React from "react";

const AttackerPage: React.FC = () => {
    const params = new URLSearchParams(window.location.search);
    const allEntries: Record<string, string | null> = {};
    params.forEach((value, key) => {
        allEntries[key] = value;
    });

    return (
        <div style={{ padding: 20 }}>
            <h1>👿 Attacker Page</h1>
            <p>Đã hứng được dữ liệu từ Keycloak:</p>
            <pre>{JSON.stringify(allEntries, null, 2)}</pre>
            <p>Copy giá trị <b>code</b> này để đổi sang access_token.</p>
        </div>
    );
};

export default AttackerPage;
