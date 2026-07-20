import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatPopup from "./ChatPopup";


const ChatButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && <ChatPopup close={() => setOpen(false)} />}

            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-blue-500 text-white shadow-2xl hover:scale-110 duration-300 flex items-center justify-center"
            >{open ? <X size={28} /> : <MessageCircle size={28} />}</button>
        </>
    )
}

export default ChatButton;