import React, { useState, useEffect, ReactNode } from 'react'
import WebAppButton from '../WebAppButton/WebAppButton'
import { CloseOutlined } from '@ant-design/icons'
import './modal.scss'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
//@ts-ignore
import { WebApp, color, sizes } from '@utils/settings'

import Loading from '@components/Loading/Loading'
import FlexContainer from '@components/layout/FlexContainer'

interface ModalProps {
    children?: ReactNode
    isOpen?: boolean
    onClose?: (e?: React.MouseEvent<HTMLButtonElement>) => void
    noCloseButton?: boolean
    glow?: boolean
    isLoading: boolean
}

const Modal: React.FC<ModalProps> = ({
    children,
    isOpen = false,
    onClose,
    noCloseButton = false,
    glow = false,
    isLoading = false,
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [animate, setAnimate] = useState<boolean>(false)
    //@ts-ignore
    const modalIsLoading = useSelector((state) => state.modalState.isLoading)
    const isLocalLoading = modalIsLoading || isLoading

    useEffect(() => {
        let timeoutId

        if (isOpen) {
            // toggle appearance in the DOM and animation
            setIsVisible(true)
            timeoutId = setTimeout(() => setAnimate(true), 10)
        } else {
            // toggle hiding from the DOM and anmation
            setAnimate(false)
            timeoutId = setTimeout(() => setIsVisible(false), 400)
        }

        return () => clearTimeout(timeoutId)
    }, [isOpen])

    function handleClose(e: React.MouseEvent<HTMLButtonElement>) {
        if (onClose) onClose(e)
    }

    if (!isVisible && !isOpen) return null

    return ReactDOM.createPortal(
        <div className={`modal-parent ${animate ? 'visible' : 'hidden'}`}>
            <div className={`modal ${animate ? 'visible' : 'hidden'} ${glow ? 'glow' : ''}`}>
                {isLocalLoading ? (
                    <FlexContainer padding={sizes.spacing_large}>
                        <Loading fullHeight={false} />
                    </FlexContainer>
                ) : (
                    <>
                        <div className="modal__content">{children}</div>
                        <WebAppHeader />
                        {noCloseButton ? null : (
                            <WebAppButton
                                loading={isLocalLoading}
                                className="modal__btn"
                                icon={<CloseOutlined />}
                                circle
                                danger
                                //@ts-ignore
                                onClick={handleClose}
                            ></WebAppButton>
                        )}
                    </>
                )}
            </div>
        </div>,
        //@ts-ignore
        document.getElementById('modal-root')
    )
}

export default Modal

function WebAppHeader() {
    useEffect(() => {
        //@ts-ignore
        WebApp.setHeaderColor(color.modal)
        return () => {
            //@ts-ignore
            WebApp.setHeaderColor(color.background)
        }
    }, [])
    return null
}
