import { action, thunk } from "easy-peasy";
import { getConversation } from "../../Api/api";
import { login,logOut} from "../../Api/api";
import { setToken } from "../../Api/Service";

const conversationModel = {
  response: [],
  allMessages: [],
  isMessageLiked: null,
  pagination: {},
  otherLoader: false,
  isLogin: false,
  setResponse: action((state, payload) => {
    state.response = payload;
  }),

  setOtherLoader: action((state, payload) => {
    state.otherLoader = payload;
  }),

  setAllMessages: action((state, payload) => {
    state.allMessages = payload;
  }),
  setPagination: action((state, payload) => {
    state.pagination = payload;
  }),
  setIsMessageLiked: action((state, payload) => {
    state.isMessageLiked = payload;
  }),

  setIsLogin: action((state, payload) => {
		state.isLogin = payload;
	}),



  getConversation: thunk(async (actions, payload, { getStoreActions, getState }) => {
    // getStoreActions().common.setLoading(true);
    console.log("hiiiiii")
    console.log("payload", payload)
    let response = await getConversation(payload);
    console.log("response", response?.data?.data)
    if (response && response.status != 200) {
      alert("false")
      //  getStoreActions().common.setLoading(false);
    } else if (response && response.status == 200) {
       
      let apiMessages = response?.data?.data.map((val, i) => {
        if (val.user_id === "62f35c5c1998a5cc682abe66") {
          return {
            text: val?.text,
            messageId: val?._id,
            isMessageLiked: val?.is_message_liked_by_me,
            message_liked_by_users: val?.message_liked_by_users,
            type: "sent"
          }
        }
        else {
          return {
            text: val?.text,
            messageId: val?._id,
            isMessageLiked: val?.is_message_liked_by_me,
            message_liked_by_users: val?.message_liked_by_users,

          }
        }
      })
      actions.setPagination(response?.data?.pagination)
      actions.setAllMessages([...apiMessages.reverse(), ...getState().allMessages])

      //getStoreActions().common.setLoading(false);
    } else {
      //alert("false")
      // getStoreActions().common.setLoading(false);
      return true;
    }
  }),

  latestMessages: thunk(async (actions, payload, { getStoreActions, getState }) => {
    console.log("payload", payload)
    actions.setAllMessages([...getState().allMessages, payload])
    // getStoreActions().common.setLoading(true);


  }),

  likeMessagesUpdate: thunk(async (actions, payload, { getStoreActions, getState }) => {
    let localData = getState().allMessages
    const index = localData.findIndex(
      (item) => item?.messageId === payload?.data?.data?._id
    );
    localData[index].message_liked_by_users = payload?.data?.data?.message_liked_by_users
    // if (getState().isMessageLiked) {
    //   actions.setIsMessageLiked(false)
    // }
    // else {
    //   actions.setIsMessageLiked(true)
    // }

    actions.setAllMessages([...localData])
  }),

	login: thunk(async (actions, payload, { getStoreActions }) => {
		await actions.setResponse({});
	//	getStoreActions().common.setLoading(true);
		let response = await login(payload);
    console.log("response",response)
		if (response && response.status !== 200) {
			//getStoreActions().common.setLoading(false);
		} else if (response && response.status === 200) {
      console.log("response.data.token",response?.data?.access_token)
      setToken(response?.data?.access_token);
			await actions.setResponse(response.data);
			await actions.setIsLogin(true);
		//	getStoreActions().common.setLoading(false);
		}
		else {
			//getStoreActions().common.setLoading(false);
			return true;
		}
	}),

  logOut: thunk(async (actions, payload, { getStoreActions }) => {
		// await actions.setResponse({});
	//	getStoreActions().common.setLoading(true);
		let response = await logOut(payload);
    console.log("response",response)
		if (response && response.status != 200) {
			//getStoreActions().common.setLoading(false);
		} else if (response && response.status == 200) {
		//	await actions.setResponse(response.data);
			await actions.setIsLogin(false);
		//	getStoreActions().common.setLoading(false);
		}
		else {
			//getStoreActions().common.setLoading(false);
			return true;
		}
	}),


};

export default conversationModel;
