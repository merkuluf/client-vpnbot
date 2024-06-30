export function parseDateString(isoString) {
    // Create a new Date object from the ISO string
    const date = new Date(isoString)

    // Extract date components
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    // Format the date string
    const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`
    return formattedDate
}

export function oneHourPassed(from) {
    const date1 = new Date(from)
    const date2 = new Date()

    const oneHourInMilliseconds = 60 * 60 * 1000

    // Calculate the difference in time
    const timeDifference = date2 - date1

    // Check if the difference is greater than one hour
    return timeDifference >= oneHourInMilliseconds
}
