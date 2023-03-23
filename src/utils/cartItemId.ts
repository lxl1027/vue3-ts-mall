export const setId = (ids: string[]) => {
    localStorage.setItem('cateItemId', JSON.stringify(ids))
}

export const getId = () => {
    const ids = localStorage.getItem('cateItemId')
    return ids ? JSON.parse(ids) : ids
}

export const removeId = () => {
    localStorage.removeItem('cateItemId')
}