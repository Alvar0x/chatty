import ContextMenuProps from '@/types/ContextMenuProps';
import Message from '@/types/client/MessageType';
import { useState } from 'react';

type MessageProps = {
    message: Message;
    mine: boolean;
    position: 'top' | 'middle' | 'bottom' | 'normal';
    setContextMenuOpen: React.Dispatch<React.SetStateAction<ContextMenuProps>>;
};

export default function Message({ message, mine, position, setContextMenuOpen }: MessageProps) {
    const tooLarge = message.content.length > 400;
    const [contentShowing, setContentShowing] = useState<string>(tooLarge ? message.content.substring(0, 400) + ' ...' : message.content);

    const onContextMenuHandler = (event: React.MouseEvent) => {
        event.preventDefault();
        setContextMenuOpen({ open: true, position: { x: event.pageX - 100, y: event.pageY - 100 }, selectedMessage: message });
    };

    return (
        <div className={`message ${mine ? 'my-message' : 'his-message'} ${position}`} onContextMenu={onContextMenuHandler}>
            <p>
                {contentShowing}
                {tooLarge && contentShowing !== message.content && (
                    <>
                        &nbsp;
                        <button type='button' className='see-more-message' onClick={() => setContentShowing(message.content)}>
                            See more
                        </button>
                    </>
                )}
            </p>
            {(position === 'bottom' || position === 'normal') && (
                <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
            )}
        </div>
    );
}
