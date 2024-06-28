import Loading from '@components/Loading/Loading'
import Modal from '@components/Modal/Modal'
import Separator from '@components/Separator/Separator'
import Text from '@components/Text/Text'
import WebAppButton from '@components/WebAppButton/WebAppButton'
import WebAppForm from '@components/WebAppForm/WebAppForm'
import WebAppInput from '@components/WebAppInput/WebAppInput'
import FlexContainer from '@components/layout/FlexContainer'
import { useCreateLavaPlanMutation, useDeleteLavaPlanMutation } from '@redux/adminApi'
import { useGetPlansQuery } from '@redux/api'
import { color, sizes } from '@utils/settings'
import { Form, message } from 'antd'

import { useCallback, useEffect, useState } from 'react'

function PlansManagement() {
    const token = localStorage.getItem('token')
    const [planForm] = Form.useForm()
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false)
    const [isPlanMapModalOpen, setIsPlanMapModalOpen] = useState(false)
    const togglePlanModal = useCallback(() => {
        setIsPlanModalOpen(!isPlanModalOpen)
    }, [isPlanModalOpen])
    const togglePlanMapModal = useCallback(() => {
        setIsPlanMapModalOpen(!isPlanMapModalOpen)
    }, [isPlanMapModalOpen])

    const [createPlan, { isLoading: isPlanCreating, isSuccess }] = useCreateLavaPlanMutation()
    const {
        data: plans,
        isLoading: isPlansLoading,
        isFetching: isPlansFetching,
        refetch: refetchPlans,
    } = useGetPlansQuery(token)
    const [deletePlan, { isLoading: isPlanDeleting, isSuccess: isPlanDeleted }] = useDeleteLavaPlanMutation()

    const [currentPlanDeleting, setCurrentPlanDeleting] = useState(null)
    const handleDeletePlan = useCallback((e) => {
        setCurrentPlanDeleting(e.target.id)
        deletePlan({
            token,
            planId: e.target.id,
        })
    }, [])

    useEffect(() => {
        refetchPlans()
        setCurrentPlanDeleting(null)
    }, [isPlanDeleted])

    useEffect(() => {
        if (isSuccess) {
            refetch()
            togglePlanModal()
            message.info('План добавлен!')
        }
    }, [isSuccess, togglePlanModal])

    function handleAddPlan(e) {
        createPlan({
            ...e,
            token,
        })
    }

    if (isPlanDeleting)
        return (
            <Loading
                fullHeight={false}
                title="Удаляем план"
            />
        )
    if (isPlansLoading || isPlansFetching)
        return (
            <Loading
                fullHeight={false}
                title="Грузим планы"
            />
        )
    if (isPlanCreating)
        return (
            <Loading
                fullHeight={false}
                title="Создаем план"
            />
        )
    return (
        <FlexContainer
            padding="0px"
            gap={sizes.spacing_small}
        >
            <WebAppButton
                loading={isPlanCreating}
                onClick={togglePlanModal}
            >
                Добавить план
            </WebAppButton>
            <Modal
                isOpen={isPlanModalOpen}
                onClose={togglePlanModal}
            >
                <FlexContainer padding="0px">
                    <Separator text="Добавить план" />
                    <WebAppForm
                        form={planForm}
                        onFinish={handleAddPlan}
                    >
                        <Form.Item
                            name="label"
                            label="Название плана"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('Введите название!'))
                                        }
                                        if (value.length < 4) {
                                            return Promise.reject(new Error('Введите название хотя бы из 4 символов!'))
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <WebAppInput placeholder="Доступ в интернет" />
                        </Form.Item>
                        <Form.Item
                            name="offerId"
                            label="offerId"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('Введите offerId!'))
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <WebAppInput placeholder="uuidv4" />
                        </Form.Item>
                        <Form.Item
                            label="Цена ₽"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                    // type: 'number',
                                },
                                () => ({
                                    validator(_, value) {
                                        if (!value) {
                                            return Promise.reject(new Error('Введите цену!'))
                                        }
                                        return Promise.resolve()
                                    },
                                }),
                            ]}
                        >
                            <WebAppInput
                                type="number"
                                placeholder="69"
                            />
                        </Form.Item>
                        <Form.Item>
                            <WebAppButton htmlType="submit">Сохранить план</WebAppButton>
                        </Form.Item>
                    </WebAppForm>
                </FlexContainer>
            </Modal>
            <WebAppButton onClick={togglePlanMapModal}>Показать планы</WebAppButton>
            <Modal
                isOpen={isPlanMapModalOpen}
                onClose={togglePlanMapModal}
            >
                <FlexContainer padding="0px">
                    {plans?.map((p) => (
                        <FlexContainer
                            key={p.id}
                            backgroundColor={color.background_light}
                            style={{
                                border: `2px solid ${color.primary_hover}`,
                            }}
                            borderRadius={sizes.spacing_small}
                        >
                            <Text>{p.label}</Text>
                            <Text>{p.price}₽</Text>
                            <WebAppButton
                                onClick={handleDeletePlan}
                                danger
                                id={p.id}
                                loading={isPlanDeleting && currentPlanDeleting == p.id}
                            >
                                Удалить план
                            </WebAppButton>
                        </FlexContainer>
                    ))}
                </FlexContainer>
            </Modal>
        </FlexContainer>
    )
}

export default PlansManagement
