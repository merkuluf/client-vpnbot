import Text from '@components/Text/Text'
import Avatar from './Avatar'
import './header.scss'
import { UserInterface } from '@/interfaces/User.interface'

interface HeaderProps {
    user: UserInterface
}

function Header({ user }: HeaderProps) {
    return (
        <div className={`user-header`}>
            <div className="user-header__item">
                <Avatar src={user?.image} />
                <Text
                    subtitle
                    block={false}
                >
                    @{user?.username}
                </Text>
            </div>
        </div>
    )
}

export default Header
