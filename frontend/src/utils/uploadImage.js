import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {

    if (!imageFile) {
        throw new Error("No image file selected");
    }

    const formData = new FormData();
    formData.append("image", imageFile);

    try {

        const response = await axiosInstance.post(
            "/user/upload-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    } catch (error) {

        console.error("Image Upload Error:", error);

        throw error?.response?.data || {
            message: "Image upload failed",
        };
    }
};

export default uploadImage;