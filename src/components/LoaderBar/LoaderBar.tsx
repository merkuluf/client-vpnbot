import './LoaderBar.scss'

interface LoaderBarProps {
    margin?: number
}

const LoaderBar: React.FC<LoaderBarProps> = ({ margin = 0 }) => {
    return (
        <div
            style={{
                marginTop: margin,
            }}
            className="loader-bar"
        >
            <div className="loader-progress"></div>
        </div>
    )
}

export default LoaderBar
