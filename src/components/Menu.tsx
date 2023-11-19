import useChatContext from '@/hooks/useChatContext';
import { MessageCircle, Plus, Trash } from 'lucide-react';
import { useEffect } from 'react';

export default function Menu() {
    const { groups, currentGroup, setCurrentGroup, loading, error } = useChatContext();

    return (
        <aside className={'menu'}>
            <section className='menu-manager'>
                <button type='button' className='selected'>
                    <MessageCircle color='#fff' fill='#fff' />
                </button>
                <button type='button'>
                    <Plus color='#fff' />
                </button>
                <button type='button'>
                    <Trash color='#fff' fill='#fff' />
                </button>
            </section>
            <section className='menu-groups'>
                {loading.groups ? (
                    <span>Loading...</span>
                ) : error.groups ? (
                    <span>{error.groups}</span>
                ) : groups.length > 0 ? (
                    <ul className='group-list'>
                        {groups.map((group) => (
                            <li
                                key={group.id}
                                onClick={() => {
                                    setCurrentGroup(group);
                                }}
                                className={`item ${currentGroup && group.id === currentGroup.id ? 'selected' : ''}`}>
                                {group.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <article className='no-groups'>
                        <span>No groups yet</span>
                    </article>
                )}
            </section>
        </aside>
    );
}
