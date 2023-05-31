export const arraySpecficObjectValue = (array, objectKey) => {
    return array.map((arrayItem) => {
        return arrayItem[objectKey]
    })
}