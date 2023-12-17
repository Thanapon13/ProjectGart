import { useState } from "react";
import { AiOutlineMail, AiFillLock, AiOutlineUser } from "react-icons/ai";
import validateRegister from "../validators/validate-register";
import { toast } from "react-toastify";
import Input from "../components/Input";
import * as authApi from "../apis/auth-api";
import useLoading from "../hooks/useLoading";
import { useNavigate } from "react-router-dom";

const initiaInput = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function LoginPage() {
  const [input, setInput] = useState(initiaInput);
  console.log("input:", input);

  const navigate = useNavigate();

  const [error, setError] = useState({});
  console.log("error:", error);

  const { startLoading, stopLoading } = useLoading();

  const handleChangeInput = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async e => {
    try {
      e.preventDefault();
      const result = validateRegister(input);
      if (result) {
        setError(result);
      } else {
        setError({});
        // console.log("inputData:", input);
        startLoading();
        await authApi.register(input);
        setInput(initiaInput);
        toast.success("sucess register. please login to continue");
        navigate("/loginPage");
      }
    } catch (err) {
      console.log("err.response?.data.message", err.response);
      toast.error(err.response?.data.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-red-200 backdrop-blur-sm flex justify-center items-center "
      style={{
        backgroundImage:
          "url('https://media.discordapp.net/attachments/1085571217563602965/1184558186146054154/abstract-background-6m6cjbifu3zpfv84.jpg?ex=658c68c7&is=6579f3c7&hm=9ed778c20f4b34161ae4b9a703e8853efca5fced522cab42a6e57c5ad44fabaa&=&format=webp&width=1191&height=670')",
        backgroundSize: "cover"
      }}
    >
      <div className="relative w-[400px] h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
              Sign Up
            </h3>

            <form
              className="space-y-6"
              action="#"
              autoComplete="off"
              onSubmit={handleSubmitForm}
            >
              <div>
                <Input
                  name="firstName"
                  value={input.firstName}
                  onChange={handleChangeInput}
                  error={error.firstName}
                  titleLabel="Firstname"
                  icon={<AiOutlineUser />}
                />
              </div>

              <div>
                <Input
                  name="lastName"
                  value={input.lastName}
                  onChange={handleChangeInput}
                  error={error.lastName}
                  titleLabel="Lastname"
                  icon={<AiOutlineUser />}
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={handleChangeInput}
                  error={error.email}
                  titleLabel="Email"
                  icon={<AiOutlineMail />}
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleChangeInput}
                  error={error.password}
                  titleLabel="Password"
                  icon={<AiFillLock />}
                />
              </div>

              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={input.confirmPassword}
                  onChange={handleChangeInput}
                  error={error.confirmPassword}
                  titleLabel="Confirm Password"
                  icon={<AiFillLock />}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign Up
                </button>
              </div>

              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-2">
                <p> Already have an account? </p>
                <a
                  href="/loginPage"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Log In?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
