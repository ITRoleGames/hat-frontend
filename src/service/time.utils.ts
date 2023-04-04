export const formatSeconds = (durationInSec: number) => {
    const seconds = durationInSec % 60;
    let minutes = (durationInSec - seconds) / 60;
    let hours = 0;
    if (minutes > 60) {
        minutes = minutes % 60;
        hours = ((durationInSec - seconds) / 60 - minutes) / 60;
    }

    return `${hours}:${minutes}:${seconds}`
}