import { useContext, useState } from "react";
import { assets } from "../../assets/LMS_assets/assets/assets";
import { AppContext } from "../../context/AppContext";

export default function PopupForm() {
    const { showModal, setShowModal } = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: null,
    });

    // const [preview, setPreview] = useState(null);
    const [SignIn, setSignIn] = useState("SignIn")


    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            const file = files[0];
            setFormData({ ...formData, image: file });
            // setPreview(URL.createObjectURL(file));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Form Submitted!");
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gray-100">
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
                            <button
                                className="absolute top-3 cursor-pointer right-3 text-gray-600 hover:text-red-500"
                                onClick={() => setShowModal(false)}
                            >
                                <img src={assets.cross_icon} alt="" />
                            </button>

                            <h2 className="text-2xl font-semibold mb-4 text-center">
                                {SignIn === "SignIn"  ?  "Signup Form" : "Login Form"}
                            </h2>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {SignIn === "SignIn" && (
                                <div>
                                    <label className="block mb-1 font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                )}

                                {/* Email Field */}
                                <div>
                                    <label className="block mb-1 font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block mb-1 font-medium">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                {
                                    SignIn === "SignIn" && (
                                <div>
                                    <label className="block mb-1 font-medium">Upload Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        className="w-full border rounded-lg px-3 py-2"
                                    />
                                    {/* {preview && (
                                        <img
                                            src={preview}
                                            alt="preview"
                                            className="mt-2 w-20 h-20 rounded-lg object-cover"
                                        />
                                    )} */}
                                </div>
                                    )}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-600 transition"
                                >
                                 {SignIn === "SignIn" ? "Register" : "Login"}
                                </button>
                                <div className='w-full flex  text-sm mt-[-8px]'>
                                    <p className='cursor-pointer'>Forgot your password?</p>
                                    {
                                    SignIn === "SignIn" ?
                                     <>
                                    <p onClick={() => setSignIn("SignUp")} className="text-blue-400 cursor-pointer">Create account</p>
                                    </>
                                    :
                                    <>
                                    <p onClick={() => setSignIn("SignIn")} className="text-blue-400 cursor-pointer">Login Here</p>
                                    </>
                                    }
                                </div>

                            </form>
                        </div>

                    </div>
                )}


            </div>
        </>

    );
}
