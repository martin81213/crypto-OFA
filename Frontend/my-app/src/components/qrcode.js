import React from 'react';
import QRCode from 'qrcode.react';

function DiscordQrcode() {
    const qrCodeOptions = {
        value: "https://discord.gg/u7EU5ztm", // 你的網站 URL
        size: 128,
        bgColor: "#ffffff",
        fgColor: "#000000",
        level: 'H',
        includeMargin: false,
    };

    return (
        <div>
            <QRCode {...qrCodeOptions} />
        </div>
    );
}

export default DiscordQrcode;
