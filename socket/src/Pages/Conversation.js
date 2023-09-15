import React, { usestate, useRef } from "react"
import Alert from 'react-bootstrap/Alert';
export const Conversation = (props) => {


  return (
    <>
      <div className="border p-4 border-primary rounded" >
        <h1>Messages</h1>
        {
          props?.messageValue?.length > 0 ?
            props?.messageValue?.map((val, i) => {
              return <Alert key={i} variant={val && val?.type === "sent" ? "primary" : "warning"}
                className={"demo"} onClick={() => { props.likeUnlike(val) }}>
                {val?.text}
                &nbsp; &nbsp;
                {/* {val?.isMessageLiked ? <i class="bi bi-heart-fill"></i> : null} */}
                {val?.message_liked_by_users?.length ?
                  val?.message_liked_by_users?.map((value, i) => {
                    //console.log("value", value,i)
                    if (value?.user_id !== "62f35c5c1998a5cc682abe66") {
                      return <> <span> Liked by {value?.username} {i===0 &&  val?.message_liked_by_users?.length>1? "and":null} </span> </>
                    }
                    else if (value?.user_id === "62f35c5c1998a5cc682abe66") {
                      return <> <span> Liked by you {i===0 && val?.message_liked_by_users?.length>1? "and":null}</span> </>
                    }
                    else {
                      return null
                    }

                  })
                  : null
                }
              </Alert>
            }) : null
        }


      </div>

    </>
  )


}