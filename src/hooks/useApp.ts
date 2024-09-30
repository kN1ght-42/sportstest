import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react'

export const useApp = () => {
    const [isFocus, setFocus] = useState(false)
    const [isText, setText] = useState(false)
    
    const [data, setData] = useState<any[]>([])

    // Подключение к API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.sports.ru/gql/graphql/?query=%7BcommentQueries%20%7Blist%20%28objectClass%3A%20POST%2C%20objectId%3A%20%223262346%22%2C%20order%3A%20BEST%2C%20first%3A%2010%29%20%7Bcomments%20%7Bid%20text%20author%20%7Bnick%7D%20published%20%7Bbunin%7D%20rating%20%7Bplus%20minus%7D%20parentComment%20%7Bid%20author%20%7Bnick%7D%20text%7D%7D%7D%7D%7D');
                const result = await response.json();

                setData(result.data.commentQueries.list.comments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    // Функция присвоения статуса закрытого textarea
    const blurInput = () => {
        setFocus(false)
    }

    // Функция присвоения статуса открытого textarea
    const focusInput = () => {
        setFocus(true)
    }

    // Функция отображения статуса ввода текста в textarea для добавления нового комментария
    const inputText = () => {
        let textarea = document.querySelector('textarea')
        let text = textarea?.value

        if (text) {
            setText(true)
        } else {
            setText(false)
        }
    }

    // Функция добавления нового комментария
    const addComment = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        let commentsInputItem = document.querySelector('textarea')?.value;
        let commentsInner = document.querySelector('.comments__inner')

        let newCom = document.createElement("div");
        newCom.classList.add('comments__item');
        newCom.innerHTML = `<div class="comments__item__top">
                <div class="comments__item__info">
                    <img
                        class="comments__item__image"
                        src="../public/images/user-images/user-image.png"
                        alt="" />
                    <div class="main__info">
                        <div class="name">Пользователь</div>
                        <div class="date">Сейчас</div>
                    </div>
                </div>
                <button onClick={openMoreWindow} data-button={0} class="comments__input__button show-more" >
                    <img src="../public/svg/more.svg" alt="" />
                </button>
                <div data-window={0} class="more__window__block">
                    <button class="more__window more__window--report">
                        <img src="/public/svg/more-window/report.svg" alt="" />
                        <div class="title">Пожаловаться</div>
                    </button>
                    <button class="more__window more__window--add-to-bl">
                        <img src="/public/svg/more-window/add-to-bl.svg" alt="" />
                        <div class="title">Добавить в черный список</div>
                    </button>
                    <button class="more__window more__window--copy-text">
                        <img src="/public/svg/more-window/copy-text.svg" alt="" />
                        <div class="title">Скопировать текст</div>
                    </button>
                    <button class="more__window more__window--copy-src">
                        <img src="/public/svg/link.svg" alt="" />
                        <div class="title">Скопировать ссылку</div>
                    </button>
                    <button class="more__window more__window--pin-com">
                        <img src="/public/svg/more-window/pin-com.svg" alt="" />
                        <div class="title">Закрепить комментарий</div>
                    </button>
                    <button class="more__window more__window--ban-user">
                        <img src="/public/svg/more-window/ban-user.svg" alt="" />
                        <div class="title">Разбанить пользователя</div>
                    </button>
                    <button class="more__window more__window--delete-com">
                        <img src="/public/svg/more-window/delete-com.svg" alt="" />
                        <div class="title">Удалить комментарий</div>
                    </button>
                </div>
            </div>
            
            <div class="comments__item__main-text">
                ${commentsInputItem}
            </div>
            <div class="comments__item__bot">
                <button class="comments__input__button button__answer">
                    Ответить
                </button>
                <div class="rating__buttons">
                    <button class="rating__button rating__button--plus">
                        +
                    </button>
                    <div class="rating__count">
                        0
                    </div>
                    <button class="rating__button rating__button--minus">
                        -
                    </button>
                </div>
            </div>
        `

        commentsInner?.appendChild(newCom)
    }

    // Функция добавления ответа к комментарию другого пальзователя
    const addAnswer = ( id: any, author: any, text: any):any => {
        let commentsInputItem = (<HTMLInputElement | null>document.querySelector(`[data-textarea="${id}"]`))?.value

        let commentsInner = document.querySelector('.comments__inner')

        let newCom = document.createElement("div");
        newCom.classList.add('comments__item');
        newCom.innerHTML = `<div class="comments__item__top">
                <div class="comments__item__info">
                    <img
                        class="comments__item__image"
                        src="../public/images/user-images/user-image.png"
                        alt="" />
                    <div class="main__info">
                        <div class="name">Пользователь</div>
                        <div class="date">Сейчас</div>
                    </div>
                </div>
                <button onClick={openMoreWindow} data-button={0} class="comments__input__button show-more" >
                    <img src="../public/svg/more.svg" alt="" />
                </button>
                <div data-window={0} class="more__window__block">
                    <button class="more__window more__window--report">
                        <img src="/public/svg/more-window/report.svg" alt="" />
                        <div class="title">Пожаловаться</div>
                    </button>
                    <button class="more__window more__window--add-to-bl">
                        <img src="/public/svg/more-window/add-to-bl.svg" alt="" />
                        <div class="title">Добавить в черный список</div>
                    </button>
                    <button class="more__window more__window--copy-text">
                        <img src="/public/svg/more-window/copy-text.svg" alt="" />
                        <div class="title">Скопировать текст</div>
                    </button>
                    <button class="more__window more__window--copy-src">
                        <img src="/public/svg/link.svg" alt="" />
                        <div class="title">Скопировать ссылку</div>
                    </button>
                    <button class="more__window more__window--pin-com">
                        <img src="/public/svg/more-window/pin-com.svg" alt="" />
                        <div class="title">Закрепить комментарий</div>
                    </button>
                    <button class="more__window more__window--ban-user">
                        <img src="/public/svg/more-window/ban-user.svg" alt="" />
                        <div class="title">Разбанить пользователя</div>
                    </button>
                    <button class="more__window more__window--delete-com">
                        <img src="/public/svg/more-window/delete-com.svg" alt="" />
                        <div class="title">Удалить комментарий</div>
                    </button>
                </div>
            </div>
            <div class="comments__item__parent-text">
				<div class="parent-name">
					Ответ <b>${author}</b>
				</div>
				<div class="parent-comment">
                    ${text}
				</div>
			</div>
            
            <div class="comments__item__main-text">
                ${commentsInputItem}
            </div>
            <div class="comments__item__bot">
                <button class="comments__input__button button__answer">
                    Ответить
                </button>
                <div class="rating__buttons">
                    <button class="rating__button rating__button--plus">
                        +
                    </button>
                    <div class="rating__count">
                        0
                    </div>
                    <button class="rating__button rating__button--minus">
                        -
                    </button>
                </div>
            </div>
        `

        commentsInner?.appendChild(newCom)
    }


    return {
        addComment,
        data,
        focusInput,
        isFocus,
        setFocus,
        blurInput,
        inputText,
        isText,
        addAnswer
    }
}
