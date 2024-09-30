import IAppItem from "../interfaces/appInterface"

import {useCommentItem} from './useCommentItem'
import {useApp} from '../hooks/useApp'

const CommentItem: React.FC<IAppItem> = (item: IAppItem) => {

	const {
		openMoreWindow,
		closingMoreWindow,
		ratingColor,
		isAnswerInput,
		openAnswerInput,
		inputTextAnswer,
		isAnswerText
		
    } = useCommentItem()

	const {
        focusInput,
        isFocus, 
        blurInput,
		addAnswer
    } = useApp()
	

	document.addEventListener('mousedown', closingMoreWindow)

	return (
		<div key={item.id} className="comments__item">
			<div className="comments__item__top">
				<div className="comments__item__info">
					<img
						className="comments__item__image"
						src="../public/images/user-images/user-image.png"
						alt="" />
					<div className="main__info">
						<div className="name">{item.author?.nick}</div>
						<div className="date">{item.published?.bunin}</div>
					</div>
				</div>
				<button onClick={openMoreWindow} data-button={item.id} className="comments__input__button show-more" >
					<img src="../public/svg/more.svg" alt="" />
				</button>
				<div data-window={item.id} className="more__window__block">
					<button className="more__window more__window--report">
						<img src="/public/svg/more-window/report.svg" alt="" />
						<div className="title">Пожаловаться</div>
					</button>
					<button className="more__window more__window--add-to-bl">
						<img src="/public/svg/more-window/add-to-bl.svg" alt="" />
						<div className="title">Добавить в черный список</div>
					</button>
					<button className="more__window more__window--copy-text">
						<img src="/public/svg/more-window/copy-text.svg" alt="" />
						<div className="title">Скопировать текст</div>
					</button>
					<button className="more__window more__window--copy-src">
						<img src="/public/svg/link.svg" alt="" />
						<div className="title">Скопировать ссылку</div>
					</button>
					<button className="more__window more__window--pin-com">
						<img src="/public/svg/more-window/pin-com.svg" alt="" />
						<div className="title">Закрепить комментарий</div>
					</button>
					<button className="more__window more__window--ban-user">
						<img src="/public/svg/more-window/ban-user.svg" alt="" />
						<div className="title">Разбанить пользователя</div>
					</button>
					<button className="more__window more__window--delete-com">
						<img src="/public/svg/more-window/delete-com.svg" alt="" />
						<div className="title">Удалить комментарий</div>
					</button>
				</div>
			</div>
			{item.parentComment &&
			<div className="comments__item__parent-text">
				<div className="parent-name">
					Ответ <b>{item.parentComment.author.nick}</b>
				</div>
				<div className="parent-comment">
					{item.parentComment.text}
				</div>
			</div>}
		
			<div className="comments__item__main-text">
				{item.text}
			</div>
			{
				isAnswerInput && 
					((isFocus || isAnswerText) ? <textarea
					className="comments__input__item comments__input__item--answer active"
					placeholder="Написать комментарий..."
					onFocus={focusInput}
					onBlur={blurInput}
					onInput={inputTextAnswer}
					data-textarea={item.id}
					></textarea> 
					: <textarea
					className="comments__input__item"
					placeholder="Написать комментарий..."
					onFocus={focusInput}
					onBlur={blurInput}
					onInput={inputTextAnswer}
					></textarea>)
			}
			{(isFocus || isAnswerText ) && (
				<div className="comments__input__bot">
					<div className="text">
						Пишите корректно и дружелюбно.
						<a href="">Принципы нашей модерации</a>
					</div>
					<button
						className="comments__input__button button__send-message"
						disabled={!isAnswerText && true}
						onClick={(e) => {e.preventDefault; addAnswer(item.id, item.author.nick, item.text)}}
					>
						Отправить
					</button>
				</div>
			)}

			<div className="comments__item__bot">
				<button data-answer={item.id} onClick={openAnswerInput} className="comments__input__button button__answer">
					{isAnswerInput ? "Закрыть" : "Ответить"}
				</button>	
				<div className="rating__buttons">
					<button className="rating__button rating__button--plus">
						+
					</button>
					<div className={ratingColor(item)}>
						{(item.rating?.plus) - (item.rating?.minus)}
					</div>
					<button className="rating__button rating__button--minus">
						-
					</button>
				</div>
			</div>
		</div>
	)
}

export default CommentItem
