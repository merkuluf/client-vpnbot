import COUNTRYCODES from '@utils/COUNTRYCODES'

const parsed = COUNTRYCODES.map((cc) => ({
    value: `${cc.value}|${cc.label}`,
    label: cc.label,
}))
