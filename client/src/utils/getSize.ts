const getSize = (file: File, size: (width: number, height: number) => void) => {
    const reader = new FileReader()
    const image = new Image()
    reader.onload = () => {
        image.src = URL.createObjectURL(file)
        image.onload = function () {
            const height = image.height
            const width = image.width
            size(width, height)
        }
    }
    reader.readAsDataURL(file)
}

export default getSize
