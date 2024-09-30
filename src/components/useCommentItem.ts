import { useState } from "react"

export const useCommentItem = () => {
	const [isAnswerInput, setAnswerInput] = useState(false)
	const [isAnswerText, setAnswerText] = useState(false)

	const openAnswerInput = () => {
        setAnswerInput(!isAnswerInput)
    }

	// Функция открытия окна по кнопке с точками
	const openMoreWindow = (event: any) => {
		event.preventDefault()
		let target = event.target
	
		let targetId = target.getAttribute('data-button')
	
		let moreWindow = document.querySelector(`[data-window="${targetId}"]`)
	
		if (moreWindow?.classList.contains('open')) {
			moreWindow?.classList.remove('open')
		} else {
			let openedMoreWindows = document.querySelectorAll('.more__window__block.open')
			openedMoreWindows.forEach(el => {
				el.classList.remove('open')
			})
	
			moreWindow?.classList.add('open')
		}
	}

	// Функция закрытия окна по кнопке с точками
	const closingMoreWindow = (event: any) => {
		let openedMoreWindows = document.querySelector('.more__window__block.open')

		if (!openedMoreWindows?.contains(event.target)) {
			openedMoreWindows?.classList.remove('open')
		}
	}

	// Функция присвоения нужного цвета к рейтингу
	const ratingColor = (item: { rating: { plus: number; minus: number } }) => {
		let className

		if ((item.rating?.plus) - (item.rating?.minus) > 0 ){
			className='rating__count plus'
		} else if ((item.rating?.plus) - (item.rating?.minus) < 0){
			className='rating__count minus';
		} else {
			className='rating__count'
		}

		return className
	}

	// Функция отображения статуса ввода текста в textarea для ответа пользователю
	const inputTextAnswer = () =>{
		let textAreas = document.querySelectorAll('.comments__input__item--answer')

		textAreas.forEach(el => {
			let text = (<HTMLInputElement>el).value

			if (text) {
				setAnswerText(true)
			} else {
				setAnswerText(false)
			}
		});

		
	}

	return {
		openMoreWindow,
		closingMoreWindow,
		ratingColor,
		isAnswerInput,
		openAnswerInput,
		inputTextAnswer,
		isAnswerText 
	}
}
