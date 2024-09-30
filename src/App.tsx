import './assets/styles/index.scss'
import {useApp} from './hooks/useApp'
import CommentItem from './components/CommentItem'

const App = () => {
    const {
        focusInput,
        isFocus,
        data,
        blurInput,
        inputText,
        isText,
        addComment,

    } = useApp()

    return (
        <div className="comments__wrapper">
            <div className="container">
                <form className="comments__form" action="">
                    <div className="comments__input__inner">
                        {
                            (isFocus || isText) ? <textarea
                            className="comments__input__item active"
                            placeholder="Написать комментарий..."
                            onFocus={focusInput}
                            onBlur={blurInput}
                            onInput={inputText}></textarea> 
                            : <textarea
                            className="comments__input__item"
                            placeholder="Написать комментарий..."
                            onFocus={focusInput}
                            onBlur={blurInput}
                            onInput={inputText}
                            ></textarea>
                                    
                        }
                        <div className="comments__input__buttons">
                            <button className="comments__input__button button--donate">
                                <img src="../public/svg/ruble.svg" alt="" />
                            </button>
                            <button className="comments__input__button button--link">
                                <img src="../public/svg/link.svg" alt="" />
                            </button>
                            <div className="comments__input__button input--file">
                                <label htmlFor="inputFile">
                                    <img
                                        src="../public/svg/share-image.svg"
                                        alt=""
                                    />
                                </label>
                                <input type="file" id="inputFile" />
                            </div>
                        </div>
                    </div>
                    {(isFocus || isText ) && (
                        <div className="comments__input__bot">
                            <div className="text">
                                Пишите корректно и дружелюбно.
                                <a href="">Принципы нашей модерации</a>
                            </div>
                            <button
                                className="comments__input__button button__send-message"
                                disabled={!isText && true}
                                onClick={addComment}
                            >
                                Отправить
                            </button>
                        </div>
                    )}
                </form>
                <div className="comments__inner">
                    {data?.map((item) => (
                        <CommentItem key={item.id} {...item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App
