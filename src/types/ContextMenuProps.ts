import MessageType from "./MessageType";

type ContextMenuProps = {
    open: boolean;
    selectedMessage?: MessageType;
    position: {
        x: number;
        y: number;
    }
}

export default ContextMenuProps;