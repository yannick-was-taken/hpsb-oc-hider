var ocHidden = false;
var hiddenMessages = [];

register("chat", e => {
    if (!ocHidden) {
        return;
    }
    let msg = e.message.formattedText;
    if (msg.indexOf("§3Officer >") !== -1) {
        hiddenMessages.push(msg);
        ocHidden = false;
        ChatLib.chat("§3Officer > §c§l(Nachricht versteckt)");
        ocHidden = true;
        cancel(e);
    }
});

register("messageSent", (message, e) => {
    if (message.toLowerCase().startsWith("/octoggle")) {
        let newHidden = !ocHidden;
        ocHidden = false;
        if (newHidden) {
            ChatLib.chat("§3Officer > §c§lOfficer-Chat deaktiviert.");
        } else {
            ChatLib.chat("§3Officer > §a§lOfficer-Chat reaktiviert.");
            ChatLib.chat(`§3Officer > §eVerpasste Nachrichten (§7${hiddenMessages.length}§e):`);
            for (let m of hiddenMessages) {
                ChatLib.chat(m);
            }
            hiddenMessages = [];
        }
        ocHidden = newHidden;
        cancel(e);
    }
});
