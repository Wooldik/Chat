import { useEffect } from 'react';
import Join from './components/Join';
import axios from 'axios'
import Chat from './components/Chat';
import socket from './socket/socket'
import { useReducer } from 'react';
import chatReducer from './chatReducer/chatReducer'
import styled from 'styled-components'



function App() {

	const [state, dispatch] = useReducer(chatReducer, {
		isAuth: false,
		roomId: null,
		userName: null,
		users: [],
		messages: []
	});


	const loginIn = async (obj) => {    //авторизация
		dispatch({
			type: 'IS_AUTH',
			payload: obj
		});
		socket.emit('ROOM:JOIN', obj);   //подключение к сокет комнате

		const { data } = await axios.get(`/rooms/${obj.roomId}`) // возвращает response

		dispatch({
			type: 'SET_DATA',
			payload: data,
		});

	}

	const setUsers = (users) => {
		dispatch({
			type: "SET_USERS",
			payload: users,
		})
	}
	const addMessage = (message) => {
		dispatch({
			type: 'NEW_MESSAGE',
			payload: message,
		});
	};

	useEffect(() => {
		socket.on('ROOM:SET_USERS', setUsers)
		socket.on('ROOM:NEW_MESSAGE', addMessage)

	}, [])




	return (
		<S.Wrapper>
			{!state.isAuth ? <Join loginIn={loginIn} /> :
				<S.Chat>
					<Chat {...state} onAddMessage={addMessage} />
				</S.Chat>
			}
		</S.Wrapper>


	)
}

const S = {
	Wrapper: styled.div`
	display:flex;
	justify-content:center;
	margin-top:200px; 
	height: 1000px;
	
	`,
	Chat: styled.div`
		border: 1px solid #000;
		width: 50%;
		height:60%;
		border-radius:20px;
	`

}


export default App;
