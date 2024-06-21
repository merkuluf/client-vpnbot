import React, { useEffect, useState } from 'react'
import { color, sizes } from '@utils/settings'

interface ProgressBarProps {
    ms: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ ms }) => {
    const [width, setWidth] = useState<number>(100)

    useEffect(() => {
        if (ms <= 0) return

        const interval = 50 // Update the progress bar every 10ms
        const step = 100 / (ms / interval)

        const intervalId = setInterval(() => {
            setWidth((prev) => {
                const newWidth = prev - step
                if (newWidth <= 0) {
                    clearInterval(intervalId)
                    return 0
                }
                return newWidth
            })
        }, interval)

        return () => clearInterval(intervalId)
    }, [ms])

    return (
        <div
            style={{
                width: '100%',
                backgroundColor: color.primary_transparent,
                height: sizes.spacing_small,
                borderRadius: sizes.spacing_medium,
            }}
        >
            <div
                style={{
                    width: `${width}%`,
                    backgroundColor: color.primary_hover,
                    borderRadius: sizes.spacing_medium,
                    height: '100%',
                    transition: 'width 10ms linear',
                }}
            />
        </div>
    )
}

export default ProgressBar
