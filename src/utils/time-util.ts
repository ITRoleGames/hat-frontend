export const calculateRoundTime = (startTime: string, moveTime: number): number => {
    return parseInt(((Date.parse(startTime) + (moveTime * 1000) - Date.now()) / 1000).toFixed(0))
}