import React, { useEffect, useMemo } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {
    const socket = useMemo(() => io("http://localhost:8080/"));

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server', socket.id);

            socket.on('welcome', (msg) => console.log(msg));
            socket.on('greeting', (msg) => console.log(msg))
        });

    }, [])

    
    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Shop</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
        </div>
    );
}

export default Chat;