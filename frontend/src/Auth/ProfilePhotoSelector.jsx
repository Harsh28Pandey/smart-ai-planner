import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImage(file);

            const previewImage = URL.createObjectURL(file);

            if (setPreview) {
                setPreview(previewImage);
            }

            setPreviewUrl(previewImage);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);

        if (setPreview) {
            setPreview(null);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">

            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div className="relative w-24 h-24 flex items-center justify-center rounded-full 
                bg-white/5 border border-white/10 backdrop-blur-xl 
                hover:ring-2 hover:ring-orange-400 transition-all duration-300 cursor-pointer">

                    <LuUser className="text-4xl text-slate-400" />

                    <button
                        type="button"
                        onClick={onChooseFile}
                        className="absolute -bottom-1 -right-1 w-9 h-9 flex items-center justify-center 
                        rounded-full bg-linear-to-r from-orange-500 to-purple-600 
                        text-white shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                        <LuUpload size={16} />
                    </button>
                </div>
            ) : (
                <div className="relative">

                    <img
                        src={preview || previewUrl}
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-orange-400 shadow-lg"
                    />

                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -bottom-1 -right-1 w-9 h-9 flex items-center justify-center 
                        rounded-full bg-red-500 text-white shadow-lg 
                        hover:bg-red-600 hover:scale-105 active:scale-95 transition cursor-pointer"
                    >
                        <LuTrash size={16} />
                    </button>

                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;