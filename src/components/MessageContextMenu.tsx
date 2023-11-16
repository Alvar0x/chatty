'use client';

import ContextMenuProps from '@/types/ContextMenuProps';
import { Clipboard, Pencil, Trash2, X } from 'lucide-react';
import { useEffect } from 'react';

type MessageContextMenuProps = {
    props: ContextMenuProps;
    setProps: React.Dispatch<React.SetStateAction<ContextMenuProps>>;
};

export default function MessageContextMenu({ props, setProps }: MessageContextMenuProps) {
    useEffect(() => {
        const onDocumentClickHandler = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (
                !(
                    target.classList.contains('copy-message') ||
                    target.classList.contains('edit-message') ||
                    target.classList.contains('delete-message')
                )
            ) {
                setProps((p) => ({ ...p, open: false }));
            }
        };

        document.addEventListener('click', onDocumentClickHandler);

        return () => {
            document.removeEventListener('click', onDocumentClickHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const copyToClipboard = (event: React.MouseEvent) => {
        navigator.clipboard.writeText(props.selectedMessage!.content);
    };

    return (
        <div className={`message-context-menu ${props.open ? 'active' : ''}`} style={{ top: props.position.y, left: props.position.x }}>
            <div className='copy-message' style={{ transform: `rotate(${props.open ? 120 : 0}deg)` }} onClick={copyToClipboard}>
                <Clipboard style={{ transform: `rotate(-${props.open ? 120 : 0}deg)` }} />
            </div>
            <div className='edit-message' style={{ transform: `rotate(${props.open ? 240 : 0}deg)` }}>
                <Pencil style={{ transform: `rotate(-${props.open ? 240 : 0}deg)` }} />
            </div>
            <div className='delete-message' style={{ transform: `rotate(${props.open ? 360 : 0}deg)` }}>
                <Trash2 style={{ transform: `rotate(-${props.open ? 360 : 0}deg)` }} />
            </div>
            <div className='close-context-menu' onClick={() => setProps((p) => ({ ...p, open: false }))}>
                <X color='#ddd' />
            </div>
        </div>
    );
}
