import { httpToken } from '~/config/httpRequest';
const httpCropImg = (data: {}): Promise<{ message: StorageManager; path: string }> => {
    return httpToken.FORM('/image/crop', data);
};

export default httpCropImg;
