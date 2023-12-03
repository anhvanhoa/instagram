const getSize = (file: File, size: (width: number, height: number) => void) => {
    let reader = new FileReader();
    const image = new Image();
    reader.onload = () => {
        image.onload = function () {
            const height = image.height;
            const width = image.width;
            size(width, height);
        };
        image.src = URL.createObjectURL(file);
    };
    reader.readAsDataURL(file);
};

export default getSize;
