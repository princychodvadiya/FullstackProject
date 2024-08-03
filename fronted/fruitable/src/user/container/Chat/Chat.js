import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {
    const [rec, setRec] = useState('');
    const [meg, setMeg] = useState('');
    const [newmsg, setNewmsg] = useState([]);
    const [group, setGroup] = useState('')

    const socket = useMemo(() => io("http://localhost:8080"));

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to the server', socket.id);
        });

        socket.on('welcome', (msg) => console.log(msg));
        socket.on('greeting', (msg) => console.log(msg));
        // socket.on('rec-mag', (msg) => console.log(msg));
        socket.on('rec-mag', (msg) => setNewmsg((prev) => [...prev, msg]))

    }, [group]);

    const handleSubmit = (e) => {
        e.preventDefault();

        socket.emit('message', {
            receiver: rec,
            message: meg
        }
        )
    }

    const handleGroupSubmit = (e) => {
        e.preventDefault();
        console.log(group);
        socket.emit('group_message', group);


    }

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
            {
                newmsg.map((v) => ( <p key={v}>{v}</p>
                ))
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="pleace enter reciver_id."
                    id='reciver'
                    // value={props.message}
                    onChange={(e) => setRec(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="plece enter Massage."
                    // value={props.message}
                    id='massage'
                    onChange={(e) => setMeg(e.target.value)}
                />
                <input type='submit' />
            </form>
            <form onSubmit={handleGroupSubmit}>
                <input
                    type="text"
                    placeholder="pleace group name."
                    id='reciver'
                    // value={props.message}
                    onChange={(e) => setGroup(e.target.value)}
                />
                <input type='submit' />
            </form>

        </div>
    );
}

export default Chat;