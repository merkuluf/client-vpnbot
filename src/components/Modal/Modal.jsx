import React, { useState, useEffect } from 'react'
import WebAppButton from '../WebAppButton/WebAppButton'
import { CloseOutlined } from '@ant-design/icons'
import './modal.scss'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'

function Modal({ children, isOpen = false, onClose }) {
    const [isVisible, setIsVisible] = useState(false)
    const [animate, setAnimate] = useState(false)

    const modalIsLoading = useSelector((state) => state.modalState.isLoading)

    useEffect(() => {
        let timeoutId

        if (isOpen) {
            setIsVisible(true)
            timeoutId = setTimeout(() => setAnimate(true), 10) // Small delay to ensure the initial render is complete
        } else {
            setAnimate(false)
            timeoutId = setTimeout(() => setIsVisible(false), 400) // Duration should match the exit animation duration
        }

        return () => clearTimeout(timeoutId)
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return ReactDOM.createPortal(
        <div className={`modal-parent ${animate ? 'visible' : 'hidden'}`}>
            <div className={`modal ${animate ? 'visible' : 'hidden'}`}>
                <div className='modal__content'>{children}</div>
                <WebAppButton
                    loading={modalIsLoading}
                    className='modal__btn'
                    icon={<CloseOutlined />}
                    circle
                    danger
                    onClick={onClose}
                ></WebAppButton>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default Modal
