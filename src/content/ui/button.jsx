import { useEffect } from 'react';

export default function Button() {
    useEffect(() => {
        console.log('content view loaded');
    }, []);

    return <button className="">Create Cover Letter</button>;
}
