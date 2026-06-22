"use client";
import { mediaList } from "@/assets/scripts/mediaList";
import HorizontalBar from "@/components/Loading/HorizontalBar";
import Input1 from "@/components/repeated/Input1";
import { setLoginStatus, setUser } from "@/store/slices/UserSlice";
import { AppDispatch } from "@/store/Store";
import { Data } from "@/types/data";
import { User } from "@/types/user";
import axios from "axios";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import envVariables from "../../../../envConfig";
import useApi from "@/hooks/useApi";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<Record<string, string> | null>(
    null,
  );
  const { sendRequest } = useApi();
  const [loadingBar, setLoadingBar] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleEmailNext = () => {
    setLoadingBar(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.trim().length == 0) {
      setErrorMess({ email: "Enter an email or phone number" });
      setLoadingBar(false);
      return;
    }
    if (!emailRegex.test(email)) {
      setErrorMess({ email: "Enter Valid Email Address" });
      setLoadingBar(false);
      return;
    }
    setTimeout(() => {
      setLoadingBar(false);
      setCurrentStep((prev) => prev + 1);
    }, 1000);
  };
  const handlePasswordNext = async () => {
    setLoadingBar(true);
    try {
      dispatch(setLoginStatus("loading"));
      if (password.trim().length == 0) {
        setErrorMess({ password: "Password should not be Empty" });
        return;
      }
      //sending request to the backend to verify user
      await sendRequest("api/login", "POST", { email, password }).then(
        (result) => {
          const data = result?.data as Data<User> | undefined;
          if (result && result.success) {
            setEmail("");
            setPassword("");
            toast.success(data?.message || "Successfully Authorized");
            if (data?.acTk) {
              localStorage.setItem("acTk", data.acTk);
            }
            if (data?.data) {
              dispatch(setUser(data.data));
              dispatch(setLoginStatus("authenticated"));
              localStorage.setItem("userInfo", JSON.stringify(data.data));
            }
            router.push("/dashboard");
          } else {
            if (data?.errors) {
              setErrorMess(data.errors);
            } else {
              throw new Error(data?.message || "Failed to login");
            }
          }
        },
      );
    } catch (error: unknown) {
      dispatch(setLoginStatus("unauthenticated"));
      if (axios.isAxiosError(error)) {
        const status = error.response?.status || 500;
        const errorMsg = error.response?.data.errors;
        const msg = error.response?.data.message || "Failed to Login";
        if (status == 404) {
          setTimeout(() => {
            router.push("/register");
          }, 2000);
        }
        let errorMessage: string;
        if (errorMsg) {
          setErrorMess(errorMsg);
          errorMessage = Object.values(errorMsg).join(", ");
        } else {
          errorMessage = msg;
        }
        setErrorMess({ password: errorMessage });
      } else {
        const err = error as Error;
        console.log("Generic Error:", err.message);
      }
    } finally {
      setLoadingBar(false);
    }
  };

  return (
    <section className="w-screen h-screen fixed top-0 left-0 m-auto bg-bgsecondary z-100 p-4 flex justify-center-safe items-center-safe text-text">
      <article className="relative w-full md:w-3/4 lg:w-1/2 p-8 rounded-4xl bg-bgprimary overflow-x-hidden">
        {loadingBar && <HorizontalBar position="top-0 left-0" />}
        <div className="pb-4">
          <Image
            src={mediaList.shortLogo}
            alt="siteLogo"
            className="h-15 w-15 cursor-pointer"
            loading="eager"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl md:text-4xl">
              {currentStep == 1 ? "Sign in" : "Welcome"}
            </h3>
            {currentStep == 1 ? (
              <p>{`to continue to ${envVariables.SITE_NAME}`}</p>
            ) : (
              <div
                className="flex gap-2 items-center rounded-full border border-border py-1 px-3 self-start cursor-pointer"
                onClick={() => setCurrentStep(1)}
              >
                <User2 size={20} />
                {email}
              </div>
            )}
          </div>
          {currentStep == 1 ? (
            <article className="flex flex-col gap-2">
              <Input1
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={email}
                setfieldValue={setEmail}
                handleNext={handleEmailNext}
                type="email"
                name="email"
                htmlFor="email"
                id="email"
                label="Email or phone"
                autoFocus={true}
                required={true}
                errorKey="email"
              />
              <Link
                href={"/forgot-email"}
                className="text-tertiary font-medium self-start transition-all"
              >
                Forgot email?
              </Link>
              <div className="flex justify-end-safe gap-4 mt-8">
                <button
                  className="rounded-full py-1 px-4 cursor-pointer hover:bg-border/10 text-border"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Create account
                </button>
                <button
                  onClick={handleEmailNext}
                  className="rounded-full py-1 px-4 cursor-pointer bg-border hover:bg-border/80 font-medium text-black"
                >
                  Next
                </button>
              </div>
            </article>
          ) : (
            <article className="flex flex-col gap-2">
              <Input1
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={password}
                setfieldValue={setPassword}
                handleNext={handlePasswordNext}
                type={showPassword ? "text" : "password"}
                name="password"
                htmlFor="password"
                id="password"
                label="Enter your password"
                autoFocus={true}
                required={true}
                errorKey="password"
              />
              {/* show password */}
              <div className="flex items-center gap-2 pl-2">
                <input
                  type="checkbox"
                  name="showPassword"
                  id="showPassword"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.currentTarget.checked)}
                  className="w-4 h-4 accent-tertiary border border-txlight"
                />
                <label htmlFor="showPassword">Show password</label>
              </div>
              <div className="flex justify-end-safe gap-4 mt-8">
                <button className="rounded-full py-1 px-3 cursor-pointer text-tertiary font-medium">
                  Forgot password?
                </button>
                <button
                  onClick={handlePasswordNext}
                  className="rounded-full py-2 px-5 cursor-pointer bg-border hover:bg-border/80 text-black"
                >
                  Next
                </button>
              </div>
            </article>
          )}
        </article>
      </article>
    </section>
  );
}
