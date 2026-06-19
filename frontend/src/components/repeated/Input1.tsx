/* eslint-disable @typescript-eslint/no-unused-vars */
import { Info } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
interface compoProps<T extends string | number | null> {
  showErrorMessage?: boolean;
  errorMess: Record<string, string> | null;
  setErrorMess: React.Dispatch<
    React.SetStateAction<Record<string, string> | null>
  >;
  fieldValue: T;
  setfieldValue: React.Dispatch<React.SetStateAction<T>>;
  handleNext: () => void;
  type: string;
  name: string;
  htmlFor: string;
  id: string;
  label: string;
  autoFocus: boolean;
  required: boolean;
  errorKey: string;
  max?: number;
  min?: number;
}
export default function Input1<T extends string | number | null>({
  showErrorMessage = true,
  errorMess,
  setErrorMess,
  fieldValue,
  setfieldValue,
  handleNext,
  type,
  name,
  htmlFor,
  id,
  label,
  autoFocus,
  required,
  errorKey,
  max,
  min,
}: compoProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputField, setInputField] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const handleInputMode = useCallback(() => {
    if (inputRef.current) {
      const isactive = document.activeElement == inputRef.current;
      if (
        isactive ||
        (typeof fieldValue === "string"
          ? (fieldValue as string).trim().length > 0
          : (fieldValue as number) > 0)
      ) {
        setInputField(true);
      } else {
        setInputField(false);
      }
      if (isactive) {
        setActive(true);
      } else {
        setActive(false);
      }
    }
  }, [fieldValue]);
  useEffect(() => {
    handleInputMode();
  }, [handleInputMode]);
  return (
    <div className="grow">
      <div className="relative w-full group flex flex-col justify-center-safe cursor-text">
        <label
          htmlFor={htmlFor}
          className={`absolute left-3 ${inputField ? "-top-2 bg-bgprimary text-xs whitespace-nowrap" : "text-base max-w-full whitespace-normal bg-transparent"} ${active ? "text-border" : "text-txlight"} cursor-text  px-1 transition-all ${required && `after:content-['*'] after:pl-1 after:text-red-500`} `}
        >
          {label}
        </label>
        <input
          ref={inputRef}
          type={type}
          name={name}
          id={id}
          value={fieldValue ? fieldValue : ""}
          max={max}
          min={min}
          autoFocus={autoFocus}
          required={required}
          className={`no-spinner border-2 ${errorMess && errorMess[errorKey] ? "border-red-500" : "border-txlight"} outline-none focus:border-border p-4 rounded-sm w-full transition-all`}
          onFocus={handleInputMode}
          onBlur={handleInputMode}
          onChange={(e) => {
            const parsedValue =
              typeof fieldValue === "number"
                ? Number(e.target.value)
                : e.target.value;
            setfieldValue(parsedValue as unknown as T);
            if (errorMess && errorMess[errorKey]) {
              const { [errorKey]: _, ...other } = errorMess;
              setErrorMess(other);
            }
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              handleNext();
            }
          }}
        />
      </div>
      {showErrorMessage && errorMess && errorMess[errorKey] && (
        <small className="text-red-500 flex mt-1 gap-2 items-center">
          <Info color="red" size={15} />
          {errorMess[errorKey]}
        </small>
      )}
    </div>
  );
}
