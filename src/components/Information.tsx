type InformationProps = {
    title: string;
    message: string;
};

export default function Information({ title, message }: InformationProps) {
    return (
        <div className='information'>
            <h2>{title}</h2>
            <span>{message}</span>
        </div>
    );
}
