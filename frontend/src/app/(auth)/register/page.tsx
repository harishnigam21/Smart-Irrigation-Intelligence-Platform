"use client";
import { mediaList } from "@/assets/scripts/mediaList";
import HorizontalBar from "@/components/Loading/HorizontalBar";
import Input1 from "@/components/repeated/Input1";
import Input2 from "@/components/repeated/Input2";
import { Data } from "@/types/data";
import { User } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import envVariables from "../../../../envConfig";
import useApi from "@/hooks/useApi";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
export type Month = (typeof months)[number];
export default function Register() {
  const [loadingBar, setLoadingBar] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMess, setErrorMess] = useState<Record<string, string> | null>(
    null,
  );
  const { sendRequest } = useApi();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [dobmonth, setDOBmonth] = useState<Month | null>(null);
  const [dobdate, setDOBdate] = useState<number | null>(null);
  const [dobyear, setDOByear] = useState<number | null>(null);
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cnfPassword, setCnfPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const getMonthPosition = () => {
    const index =
      months?.findIndex(
        (item) => item.toLowerCase() == dobmonth?.toLowerCase(),
      ) | 0;
    const correctPosition = index + 1;
    if (correctPosition < 10) {
      return `0${correctPosition}`;
    } else {
      return correctPosition;
    }
  };
  const handleStep1 = () => {
    setLoadingBar(true);
    const validaton = registrationValidation([
      { value: firstname, type: "First_Name" },
    ]);
    if (!validaton) {
      setLoadingBar(false);
      return;
    }
    setTimeout(() => {
      setCurrentStep(2);
      setLoadingBar(false);
    }, 1000);
  };
  const handleStep2 = async () => {
    setLoadingBar(true);
    const validaton = registrationValidation([
      { value: dobmonth, type: "DOB_Month" },
      { value: dobdate, type: "DOB_Date" },
      { value: dobyear, type: "DOB_Year" },
      { value: gender, type: "Gender" },
    ]);
    if (!validaton) {
      setLoadingBar(false);
      return;
    }
    setTimeout(() => {
      setLoadingBar(false);
      setCurrentStep(3);
    }, 1000);
  };
  const handleStep3 = async () => {
    setLoadingBar(true);
    const validaton = registrationValidation([{ value: email, type: "Email" }]);
    if (!validaton) {
      setLoadingBar(false);
      return;
    }
    setTimeout(() => {
      setLoadingBar(false);
      setCurrentStep(4);
    }, 1000);
  };
  const handleStep4 = async () => {
    try {
      setLoadingBar(true);
      const validaton = registrationValidation([
        { value: password, type: "Password" },
        { value: cnfPassword, type: "Confirm_Password" },
      ]);
      if (!validaton) {
        setLoadingBar(false);
        return;
      }
      await sendRequest("api/register", "POST", {
        firstname,
        lastname,
        gender,
        dob: `${dobdate}-${getMonthPosition()}-${dobyear}`,
        email,
        password,
        cnfPassword,
      }).then((result) => {
        const data = result?.data as Data<User> | undefined;
        if (result && result.success) {
          toast.success(data?.message || "Successfully Registered");
          setFirstname("");
          setLastname("");
          setDOBmonth(null);
          setDOBdate(null);
          setDOByear(null);
          setGender("");
          setPassword("");
          setCnfPassword("");
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        } else {
          if (result.status == 403) {
            setTimeout(() => {
              router.push("/login");
            }, 2000);
          }
          if (data && data.errors) {
            setErrorMess(data.errors);
          } else {
            throw new Error(data?.message || "Failed to Register");
          }
        }
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMess((prev) => ({ ...prev, Confirm_Password: error.message }));
      } else {
        const err = error as Error;
        console.log("Generic Error:", err.message);
      }
    } finally {
      setLoadingBar(false);
    }
  };
  const registrationValidation = (fields: { value: any; type: string }[]) => {
    for (const item of fields) {
      if (item.type == "First_Name") {
        if (item.value.trim().length <= 3) {
          setErrorMess((prev) => ({
            ...prev,
            [item.type]: `Invalid ${item.type}`,
          }));
          return false;
        }
      }
      if (item.type == "Gender") {
        if (
          item.value.toLowerCase() != "male" &&
          item.value.toLowerCase() != "female" &&
          item.value.toLowerCase() != "other"
        ) {
          setErrorMess((prev) => ({
            ...prev,
            Gender: `Invalid Gender`,
          }));
          return false;
        }
      }
      if (item.type == "DOB_Month") {
        if (!months.includes(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            DOB_Month: `Invalid Month`,
          }));
          return false;
        }
      }
      if (item.type == "DOB_Date") {
        if (
          item.value < 1 ||
          item.value > 31 ||
          (dobmonth &&
            dobmonth.toLowerCase().includes("feb") &&
            item.value > 29)
        ) {
          setErrorMess((prev) => ({
            ...prev,
            DOB_Date: `Invalid Date`,
          }));
          return false;
        }
      }
      if (item.type == "DOB_Year") {
        const year = new Date().getFullYear();
        if (item.value > year || item.value < year - 100) {
          setErrorMess((prev) => ({
            ...prev,
            DOB_Year: `Invalid Year`,
          }));
          return false;
        }
      }
      if (item.type == "Password") {
        if (!item.value) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password is required.",
          }));
          return false;
        }
        if (/\s/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password cannot contain spaces.",
          }));
          return false;
        }
        if (!/(?=.*[A-Z])/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password needs at least one capital letter.",
          }));
          return false;
        }
        if (!/(?=.*\d)/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password needs at least one number.",
          }));
          return false;
        }
        if (!/(?=.*[!@#$%^&*()_+])/.test(item.value)) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password needs at least one symbol.",
          }));
          return false;
        }
        if (item.value.trim().length < 8) {
          setErrorMess((prev) => ({
            ...prev,
            Password: "Password must be at least 8 characters long.",
          }));
          return false;
        }
      }
      if (item.type == "Confirm_Password") {
        if (item.value !== password) {
          setErrorMess((prev) => ({
            ...prev,
            Confirm_Password: "Your Password doesn' match",
          }));
          return false;
        }
      }
      if (item.type == "Email") {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email.trim().length == 0) {
          setErrorMess((prev) => ({
            ...prev,
            Email: "Enter an email or phone number",
          }));
          return false;
        }
        if (!emailRegex.test(email)) {
          setErrorMess((prev) => ({
            ...prev,
            Email: "Enter Valid Email Address",
          }));
          return false;
        }
      }
    }
    return true;
  };
  const handleDirection = (direction: string) => {
    if (direction == "left" && currentStep !== 1) {
      setCurrentStep((prev) => prev - 1);
    }
    if (direction == "right" && currentStep !== 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  return (
    <section className="w-screen h-screen fixed top-0 left-0 z-100 m-auto bg-bgsecondary p-4 flex justify-center-safe items-center-safe text-text">
      <article className="relative w-full md:w-[75%] p-8 rounded-4xl bg-bgprimary overflow-hidden">
        {loadingBar && <HorizontalBar position="top-0 left-0" />}
        <div className="pb-4">
          <Image
            src={mediaList.shortLogo}
            alt="siteLogo"
            className="h-15 w-15"
            loading="eager"
          />
        </div>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
          <div className="flex flex-col gap-3">
            {currentStep == 1 ? (
              <>
                <h3 className="text-2xl md:text-4xl">
                  Create a Google Account
                </h3>
                <p>Enter your name</p>
              </>
            ) : currentStep == 2 ? (
              <>
                <h3 className="text-2xl md:text-4xl">Basic information</h3>
                <p>Enter your birthday and gender</p>
              </>
            ) : currentStep == 3 ? (
              <>
                <h3 className="text-2xl md:text-4xl">Unique Identity</h3>
                <p>Enter Email for Unique Identification</p>
              </>
            ) : (
              <>
                <h3 className="text-2xl md:text-4xl">
                  Create a strong password
                </h3>
                <p>
                  Create a strong password with a mix of letters, numbers and
                  symbols
                </p>
              </>
            )}
          </div>
          {currentStep == 1 ? (
            <article className="flex flex-col justify-center gap-4">
              <Input1
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={firstname}
                setfieldValue={setFirstname}
                handleNext={() => {
                  if (
                    !registrationValidation([
                      { value: firstname, type: "First_Name" },
                    ])
                  ) {
                    return;
                  }

                  const nextfield = document.getElementById("lname");
                  if (nextfield) {
                    nextfield.focus();
                  }
                }}
                type="text"
                name="fname"
                htmlFor="fname"
                id="fname"
                label="First name"
                autoFocus={true}
                required={true}
                errorKey="First_Name"
              />
              <Input1
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={lastname}
                setfieldValue={setLastname}
                // handleNext={handleStep1}
                handleNext={handleStep1}
                type="text"
                name="lname"
                htmlFor="lname"
                id="lname"
                label="Last name (optional)"
                autoFocus={false}
                required={false}
                errorKey="Last_Name"
              />
              <p className=" font-light text-sm">
                Already have an account?{"  "}
                <span
                  className="text-tertiary font-medium cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  SignIn
                </span>
              </p>
              <button
                onClick={handleStep1}
                className="self-end rounded-full mt-10 py-2 px-5 cursor-pointer bg-border hover:bg-border/80 font-medium text-black"
              >
                Next
              </button>
            </article>
          ) : currentStep == 2 ? (
            <article className="flex flex-col justify-center gap-4">
              <div className="grid grid-cols-3 gap-4">
                <Input2
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={dobmonth}
                  setfieldValue={setDOBmonth}
                  handleNext={() => {
                    const nextfield = document.getElementById("dobdate");
                    if (nextfield) {
                      nextfield.focus();
                    }
                  }}
                  name="dobmonth"
                  htmlFor="dobmonth"
                  id="dobmonth"
                  label="Month"
                  options={months}
                  autoFocus={true}
                  required={true}
                  errorKey="DOB_Month"
                />
                <Input1
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={dobdate}
                  setfieldValue={setDOBdate}
                  handleNext={() => {
                    const nextfield = document.getElementById("dobyear");
                    if (nextfield) {
                      nextfield.focus();
                    }
                  }}
                  type="number"
                  name="dobdate"
                  htmlFor="dobdate"
                  id="dobdate"
                  label="Day"
                  autoFocus={false}
                  required={true}
                  errorKey="DOB_Date"
                  min={1}
                  max={31}
                />
                <Input1
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={dobyear}
                  setfieldValue={setDOByear}
                  handleNext={() => {
                    const nextfield = document.getElementById("gender");
                    if (nextfield) {
                      nextfield.focus();
                    }
                  }}
                  type="number"
                  name="dobyear"
                  htmlFor="dobyear"
                  id="dobyear"
                  label="Year"
                  autoFocus={false}
                  required={true}
                  errorKey="DOB_Year"
                  min={new Date().getFullYear() - 100}
                  max={new Date().getFullYear()}
                />
              </div>
              <Input2
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={gender}
                setfieldValue={setGender}
                handleNext={() => {
                  if (
                    !registrationValidation([{ value: gender, type: "Gender" }])
                  ) {
                    return;
                  }
                }}
                name="gender"
                htmlFor="gender"
                id="gender"
                label="Gender"
                options={["Male", "Female", "Other"]}
                autoFocus={false}
                required={true}
                errorKey="Gender"
              />
              <button
                onClick={handleStep2}
                className="self-end rounded-full mt-10 py-2 px-5 cursor-pointer bg-border hover:bg-border/80 font-medium text-black"
              >
                Next
              </button>
            </article>
          ) : currentStep == 3 ? (
            <article className="flex flex-col justify-center gap-8">
              <div className="relative flex flex-col justify-center">
                <Input1
                  errorMess={errorMess}
                  setErrorMess={setErrorMess}
                  fieldValue={email}
                  setfieldValue={setEmail}
                  handleNext={handleStep3}
                  type="email"
                  name="email"
                  htmlFor="email"
                  id="email"
                  label="Email"
                  autoFocus={true}
                  required={true}
                  errorKey="Email"
                />
              </div>
              <button
                onClick={handleStep3}
                className="self-end rounded-full py-2 px-5 cursor-pointer bg-border hover:bg-border/80 font-medium text-black"
              >
                Next
              </button>
            </article>
          ) : (
            <article className="flex flex-col justify-center gap-4">
              <Input1
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={password}
                setfieldValue={setPassword}
                handleNext={() => {
                  if (
                    !registrationValidation([
                      { value: password, type: "Password" },
                    ])
                  ) {
                    return;
                  }

                  const nextfield = document.getElementById("cnfpassword");
                  if (nextfield) {
                    nextfield.focus();
                  }
                }}
                type={showPassword ? "text" : "password"}
                name="password"
                htmlFor="password"
                id="password"
                label="Password"
                autoFocus={true}
                required={true}
                errorKey="Password"
              />
              <Input1
                errorMess={errorMess}
                setErrorMess={setErrorMess}
                fieldValue={cnfPassword}
                setfieldValue={setCnfPassword}
                handleNext={handleStep4}
                type={showPassword ? "text" : "password"}
                name="cnfpassword"
                htmlFor="cnfpassword"
                id="cnfpassword"
                label="Confirm"
                autoFocus={false}
                required={true}
                errorKey="Confirm_Password"
              />
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
              <button
                onClick={handleStep4}
                className="self-end rounded-full mt-10 py-2 px-5 cursor-pointer bg-border hover:bg-border/80 text-black"
              >
                Submit
              </button>
            </article>
          )}
        </article>

        {/* Directions */}
        {/* left */}
        {currentStep !== 1 && (
          <div
            title="previous step"
            className="absolute left-0 top-0 bottom-0 translate-y-1/2 -ml-3 cursor-pointer"
            onClick={() => handleDirection("left")}
          >
            <mediaList.FaCaretDown className="text-3xl -rotate-90 scale-x-250 scale-y-125 text-bgsecondary/80" />
          </div>
        )}
        {/* Right */}
        {/* {currentStep !== 3 && (
          <div
            title="next step"
            className="absolute right-0 top-0 bottom-0 translate-y-1/2 -mr-3 cursor-pointer"
            onClick={() => handleDirection("right")}
          >
            <mediaList.FaCaretDown className="text-3xl rotate-90 scale-x-200 text-borderhover" />
          </div>
        )} */}
      </article>
    </section>
  );
}
