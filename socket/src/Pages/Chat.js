import React, { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import io from 'socket.io-client';
import { EMIT_SEND_PERSONAL_MESSAGE, ON_PERSONAL_MESSAGE, EMIT_JOIN, EMIT_PERSONAL_LIKE_UNLIKE, ON_PERSONAL_LIKE_UNLIKE } from "../SocketEvents"
import { Conversation } from "./Conversation";
import { useStoreActions, useStoreState } from "easy-peasy";
import { getToken } from "../Api/Service";
import addNotification from 'react-push-notification';
const ENDPOINT = "wss://dev.picnicapp.link/";
//const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmYzNWM1YzE5OThhNWNjNjgyYWJlNjYiLCJjdXJyZW50RW52IjoiZGV2ZWxvcG1lbnQiLCJpYXQiOjE2Njk3MDM1MjEsImV4cCI6MTY3MjI5NTUyMX0.hEbxPK9rI0aq7-EL2Alvb5ppOGIDKJcEvYPh9E6LimU"
const authToken =getToken()
var socket = io(ENDPOINT, {
    extraHeaders: {
        Authorization: authToken ? ("Bearer " + authToken) : "",
      //  Authorization:  ("Bearer " + getToken()) ,
        'Accept-Language': "en",
        version: '1'
    }
}); socket.connect();
export const Chat = () => {

    const [textMessage, setTextMessage] = useState()
    const [messageStatus, setMessageStatus] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [notificationClick, setNotificationClick] = useState(false)


    const allMessages = useStoreState((state) => state.conversation.allMessages);
    const getConversation = useStoreActions((action) => action.conversation.getConversation);
    const latestMessages = useStoreActions((action) => action.conversation.latestMessages);
    const pagination = useStoreState((state) => state.conversation.pagination);
    const setAllMessages = useStoreActions((action) => action.conversation.setAllMessages);
    const likeMessagesUpdate = useStoreActions((action) => action.conversation.likeMessagesUpdate);
    const isMessageLiked =useStoreState((state) => state.conversation.isMessageLiked);


    useEffect(()=>{
        console.log("allMessages",allMessages)
    },[allMessages])

    useEffect(() => {
         setAllMessages([])
         getConversation({
            user_id: "62cfd7d46408fab3dcfc4777",
            page: 1,
            limit: 20,
        })

       

    }, [])


    useEffect(() => {

        socket.on("connect", () => { // listener start
            console.log(socket.connected); // true.

            socket.emit(EMIT_JOIN)

        });

        socket.on(ON_PERSONAL_MESSAGE, function (data) {
            console.log("ON_PERSONAL_MESSAGE", data)


            if(data?.data?.data?.user_id === "62f35c5c1998a5cc682abe66"){
                latestMessages({
                    text: data?.data?.data?.text,
                    messageId: data?.data?.data?._id,
                    message_liked_by_users: data?.data?.data?.message_liked_by_users,
                    type: "sent"
                })
                setMessageStatus(data?.message)
            }
            else{
                latestMessages({
                    text: data?.data?.data?.text,
                    messageId: data?.data?.data?._id,
                    message_liked_by_users: data?.data?.data?.message_liked_by_users
                })
                if (document.hidden) {
                    addNotification({
                        title: 'push notification',
                        subtitle: 'This is a subtitle',
                        // onClick: (e) => setNotificationClick(true),
                        message: data?.data?.data?.text,
                        theme: 'darkblue',
                        native: true // when using native, your OS will handle theming.
                    });
                }
            }
        });

        socket.on(ON_PERSONAL_LIKE_UNLIKE, function (data) {

            console.log("data", data)
            likeMessagesUpdate(data)

        });


    }, []);

    useEffect(() => {
        if (notificationClick) {
            window.open('http://localhost:3000/', '_blank');
            setNotificationClick(false)
        }
    }, [notificationClick])

    console.log("window.location.pathname", window.location.href)

    function submit(event) {
        event.preventDefault()
        if (textMessage?.length) {
            socket.emit(EMIT_SEND_PERSONAL_MESSAGE, {
                event: EMIT_SEND_PERSONAL_MESSAGE,
                payload: {
                    //chat_room_id: "636e03fd6c752686a98a91ac",
                    user_id: "62cfd7d46408fab3dcfc4777",
                    message_type: "text",
                    text: textMessage
                }
            });
            setTextMessage("")
        }

    }

    const listInnerRef = useRef(null);
    const onScroll = async () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                // setParams((_) => ({
                //   ..._,
                //   page: parseInt((_.page ?? 1)?.toString()) + 1,
                // }));
            }

            if (scrollTop === 0 && pagination !== null) {
                await getConversation({
                    user_id: "62cfd7d46408fab3dcfc4777",
                    page: currentPage + 1,
                    limit: 20,
                })
                setCurrentPage((_ => (_ + 1)))
                console.log("back to top")
            }
        }
    };

    useEffect(() => {
        listInnerRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    }, [])

    const likeUnlike = (data) => {
        const index = allMessages.findIndex(
            (item) => item?.messageId === data?.messageId
        );
        let likeValue = allMessages[index]?.message_liked_by_users?.some(item => item?.user_id === "62f35c5c1998a5cc682abe66")
       socket.emit(EMIT_PERSONAL_LIKE_UNLIKE, {
                event: EMIT_PERSONAL_LIKE_UNLIKE,
                payload: {
                    "message_id": data?.messageId,
                    "is_like": likeValue ? "0" : "1"
                    // "is_like": allMessages[index]?.isMessageLiked ? "0" : "1"
                }
            });

    }


    return (
        <>
            <div className="container" >
                <div className="row mt-4" >

                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} placeholder="type message" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </Form>
                    </div>
                    <div className="col-md-4" style={{ overflow: "scroll", height: "450px" }} onScroll={onScroll} ref={listInnerRef}>
                        <Conversation messageValue={allMessages} likeUnlike={likeUnlike} />
                    </div>
                </div>
            </div>
        </>
    )
}
