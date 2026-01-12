import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../service/api";
// import api from "../services/api";
// import { setToken } from "../utils/auth";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
    const res = await registerUser(data)


   if (res.success) {
    localStorage.setItem("token", res.token);
    navigate("/posts");
  } else {
    setError(res.message);
  }

  setLoading(false);
    
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                errors.email
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: strongPasswordRegex,
                  message:
                    "Password must be at least 8 chars, include uppercase, lowercase, number & special char",
                },
              })}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-200"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
