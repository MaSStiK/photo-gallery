// Получаем массив папок с картинками
export function getFolders() {
    try {
        fetch(location.origin + "/api/folders")
        .then(res => res.json())
        .then(data => {
            return data.sort((a, b) => b.birthtimeMs - a.birthtimeMs)
        })
    } catch (error) {
        console.log("error", error)
    }
}