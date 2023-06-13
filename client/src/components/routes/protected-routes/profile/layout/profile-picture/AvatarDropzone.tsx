import { useState } from "react"
import { useDropzone } from "react-dropzone"
import StyledButton from "../../../../../ui/StyledButton"

type Props = {
  firstName: string
  profilePicture: string | undefined
}

const AvatarDropzone = ({ firstName, profilePicture }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0])
    },
  })

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("upload_preset", "ugjfytls")

      const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL
      console.log(CLOUDINARY_URL)
      try {
        const cloudinaryResponse = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        })
        const data = await cloudinaryResponse.json()

        console.log(data.secure_url)
      } catch (error) {
        console.log(
          "Error occurred while uploading image to Cloudinary:",
          error
        )
      }
    }
  }

  return (
    <div className="space-y-16">
      <input {...getInputProps()} />
      <div
        className={`group relative flex items-center justify-center w-96 h-96 rounded-full cursor-pointer duration-500 caret-transparent  hover:bg-secondary border-4 border-secondary ${
          isDragActive ? "border-dashed bg-tertiary" : "bg-gray-500"
        }`}
        {...getRootProps()}
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Profile Picture"
            className="rounded-full object-cover w-full h-full"
          />
        ) : profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile Picture"
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <h1 className="text-9xl text-gray-400 select-none capitalize">
            {firstName.charAt(0)}
          </h1>
        )}
      </div>
      <StyledButton
        buttonText="Set Profile Picture"
        onClick={handleSubmit}
        twClasses="w-full text-xl font-semibold bg-secondary text-tertiary border-2 border-secondary"
      />
    </div>
  )
}

export default AvatarDropzone
