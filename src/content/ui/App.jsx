import { useEffect } from 'react';

export default function App() {
    useEffect(() => {
        console.log('content view loaded');
    }, []);

    return (
        <>
         <button className="btn btn-primary floating-button">Create Cover Letter</button>;
        </>
    );
}
