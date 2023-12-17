import {
  AiOutlineMail,
  AiFillLock,
  AiFillEye,
  AiFillEyeInvisible
} from "react-icons/ai";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function LoginPage() {
  const { userLogin, authenticateUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  const handleSubmitForm = async e => {
    try {
      e.preventDefault();
      await userLogin(email, password);
      toast.success("login success");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    if (authenticateUser && authenticateUser.isAdmin === true) {
      navigate("/adminPage");
    } else if (authenticateUser && authenticateUser.isAdmin === false) {
      navigate("/");
    }
  }, [authenticateUser, navigate]);

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm flex justify-center items-center bg-cover"
      style={{
        backgroundImage:
          "url('https://media.discordapp.net/attachments/1085571217563602965/1184558186146054154/abstract-background-6m6cjbifu3zpfv84.jpg?ex=658c68c7&is=6579f3c7&hm=9ed778c20f4b34161ae4b9a703e8853efca5fced522cab42a6e57c5ad44fabaa&=&format=webp&width=1191&height=670')",
        backgroundSize: "cover"
      }}
    >
      <div className="relative w-[400px] h-full max-w-md md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8">
            <div className="flex ">
              <div className="flex items-center">
                <Link to="/">
                  <i className="cursor-pointer -left-4 -top-4 text-2xl">
                    <IoMdArrowRoundBack />
                  </i>
                </Link>
              </div>
            </div>

            <div className="flex ">
              <div className="w-full flex items-center justify-center">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white text-center">
                  Log In
                </h3>
              </div>
            </div>

            <form className="space-y-6" action="#" onSubmit={handleSubmitForm}>
              <div>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  titleLabel="Email"
                  icon={<AiOutlineMail />}
                />
              </div>

              <div className="relative flex ">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  titleLabel="Password"
                  icon={<AiFillLock />}
                  viewPassword={true}
                  setShowPassword={() => setShowPassword(!showPassword)}
                  showPassword={showPassword}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Log In
                </button>
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300 flex gap-2">
                <p> Don't have an account?</p>
                <a
                  href="/rejisterPage"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Register
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
