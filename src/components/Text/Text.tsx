import React, { CSSProperties, ReactNode } from 'react'
import './text.scss'
import { color } from '@utils/settings'

interface TextProps {
    children?: ReactNode
    title?: boolean
    subtitle?: boolean
    normal?: boolean
    hint?: boolean
    bullet?: boolean
    align?: CSSProperties['textAlign']
    block?: boolean
    clr?: string
    className?: string
    style?: JSON
}

const Text: React.FC<TextProps> = ({
    children,
    title,
    subtitle,
    normal,
    hint,
    bullet,
    align = 'start',
    block = true,
    clr = color.text,
    className,
    style,
}) => {
    // Assign priority levels to each type
    const priorityLevels = {
        title: 4,
        subtitle: 3,
        normal: 2,
        hint: 1,
    }

    const textClass = className ? className : ''

    // Create an array of all props with their corresponding priority level
    const typesWithPriority = [
        { prop: title, type: 'title', priority: priorityLevels.title },
        { prop: subtitle, type: 'subtitle', priority: priorityLevels.subtitle },
        { prop: normal, type: 'normal', priority: priorityLevels.normal },
        { prop: hint, type: 'hint', priority: priorityLevels.hint },
    ]

    // Filter props that were passed (are true) and sort them by priority
    const sortedTypes = typesWithPriority.filter((type) => type.prop).sort((a, b) => b.priority - a.priority)

    // Determine the highest priority type to render
    const highestPriorityType = sortedTypes.length > 0 ? sortedTypes[0].type : 'normal'

    // Prepare children with bullet if bullet prop is passed
    const content = bullet ? (
        <>
            <span>• </span>
            {children}
        </>
    ) : (
        children
    )

    // Render based on the highest priority type
    switch (highestPriorityType) {
        case 'title':
            return (
                <h1
                    style={{
                        textAlign: align,
                        color: clr,
                        width: block ? '100%' : '',
                        ...style,
                    }}
                    className={`text-title ${textClass}`}
                >
                    {content}
                </h1>
            )
        case 'subtitle':
            return (
                <h3
                    style={{
                        textAlign: align,
                        color: clr,
                        width: block ? '100%' : '',
                        ...style,
                    }}
                    className={`text-subtitle ${textClass}`}
                >
                    {content}
                </h3>
            )
        case 'normal':
            return (
                <p
                    style={{
                        textAlign: align,
                        color: clr,
                        width: block ? '100%' : '',
                        ...style,
                    }}
                    className={`text-normal ${textClass}`}
                >
                    {content}
                </p>
            )
        case 'hint':
            return (
                <p
                    style={{
                        textAlign: align,
                        color: clr,
                        width: block ? '100%' : '',
                        ...style,
                    }}
                    className={`text-hint ${textClass}`}
                >
                    {content}
                </p>
            )
        default:
            return (
                <p
                    style={{ textAlign: align, color: clr, ...style }}
                    className={`text-normal ${textClass}`}
                >
                    {content}
                </p>
            )
    }
}

export default Text
