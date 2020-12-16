
import { useEffect, useRef, useState } from "react"
import socket from '../../socket/socket'
import { Layout } from 'antd'
import styled from "styled-components"
import { Input } from 'antd';
import './Chat.css'

const { TextArea } = Input;

const { Header, Sider } = Layout


const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {



	const [messageValue, setMessageValue] = useState('');
	const messagesRef = useRef(null)


	const onSendMessage = () => {   // передача через сокет на сервер

		socket.emit('ROOM:NEW_MESSAGE', {
			userName,
			roomId,
			text: messageValue
		})
		onAddMessage({ userName, text: messageValue })
		setMessageValue('')
	}

	useEffect(() => {
		messagesRef.current.scrollTo(0, 9999);
	}, [messages]);


	return (
		<>

			<Header style={{
				color: 'white',
				textAlign: 'center',
				fontFamily: "Calibri,sans-serif",
				fontSize: '1.5rem',
				fontWeight: 'bold',
				borderRadius: '20px  20px 0 0 ',
				background: "linear-gradient(to right top, #1eaf26,#3e3e94)",
				minWidth: '383px'
			}}>Комната: {roomId}</Header>



			<Layout style={{ height: '534px', borderRadius: '0 0 20px  20px' }}>
				<Sider theme={"light"} style={{
					padding: '20px',
					fontSize: '1.3rem',
					height: '100%',
					borderRadius: '0 0 0 20px'
				}}>

					<b>Онлайн ({users.length}):</b>
					<S.List>
						{users.map((name, index) => (
							<li key={name + index}>{name}</li>
						))}
					</S.List>

				</Sider>
				<S.Chat >
					<div ref={messagesRef} >
						{messages.map((message) => (
							<div className="message" >
								<p>{message.text}</p>
								<div>
									<span>{message.userName}</span>
								</div>
							</div>
						))}
					</div>
					<form>
						<TextArea
							value={messageValue}
							onChange={(e) => setMessageValue(e.target.value)}
							className="form-control"
							rows="3"></TextArea>
						<S.Button onClick={onSendMessage} type="button" className="btn btn-primary">
							Отправить
          </S.Button>
					</form>

				</S.Chat>
			</Layout>
		</>
	)
}

const S = {

	List: styled.ul`
	list-style:none;
		padding:0;
		& li{
			padding-top:15px;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		
		}
	`,
	Chat: styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		padding: 30px;
		& div{
			flex: 1;
			overflow: auto;

			::-webkit-scrollbar {
				 width: 12px;
				 
		}
 
			::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
		}
 
			::-webkit-scrollbar-thumb {
				border-radius: 10px;
				-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
			}
		}
		& p {
  display: inline-flex;
  border-radius: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: #7160ff;
  padding: 10px 15px 15px;
  color: #fff;
  margin-bottom: 2px;
}
  & span {
  opacity: 0.5;
  font-size: 14px;
}

	
	`,



	Button: styled.button`
	margin-top:15px;
	padding:10px 20px;
	border-radius: 10px;
	background:linear-gradient(to right top, #1eaf26,#3e3e94); 
	color:#fff;
	outline: none;
	
`
}


export default Chat