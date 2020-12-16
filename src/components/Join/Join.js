import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'


const Join = ({ loginIn }) => {


	const [roomId, setRoomId] = useState('')
	const [userName, setUserName] = useState('')
	const [isLoading, setIsLoading] = useState(false)


	const onEnter = async () => {
		if (!roomId || !userName) {
			return alert('Заполните все поля')
		}

		const obj = {
			roomId,
			userName
		}
		setIsLoading(true)

		await axios.post('/rooms', obj)
		setTimeout(() => {
			setIsLoading(false)
			loginIn(obj)
		}, 1000)


	}


	return (<S.Wrapper>

		<div>
			<S.Input
				type='text'
				placeholder='Room ID'
				value={roomId}
				onChange={({ target }) => setRoomId(target.value)}
			/>
		</div>
		<div>
			<S.Input
				type='text'
				placeholder='Nickname'
				value={userName}
				onChange={({ target }) => setUserName(target.value)}
			/>
		</div>
		<div>
			<S.Button disabled={isLoading} onClick={onEnter}>
				{isLoading ? 'Вход...' : 'Войти'}
			</S.Button>
		</div>

	</S.Wrapper>)
}

const S = {
	Wrapper: styled.div`
	flex:1 1 1;
	`,
	Input: styled.input`
		width:250px;
		height:50px;
		font-size:1.3rem;
		border-radius: 10px;
		background-color:#eef1ef;
		margin-top:10px;
		text-align:center;
		outline: none;
	`,
	Button: styled.button`
		padding:10px 20px;
		margin:10px 85px;
		border-radius: 10px;
		background-color:#6ac34a; 
		outline: none;
	`
}

export default Join