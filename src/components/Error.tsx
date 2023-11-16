type ErrorProps = {
    title: string;
    message: string;
};

export default function Error({ title, message }: ErrorProps) {
    return (
        <div className='error-container'>
            <h2>{title}</h2>
            <span>{message}</span>
        </div>
    );
}
