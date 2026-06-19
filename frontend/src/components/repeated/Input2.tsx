/* eslint-disable @typescript-eslint/no-unused-vars */
import { mediaList } from "@/assets/scripts/mediaList";
import { Info } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
interface compoProps<T extends string | number | null> {
  errorMess?: Record<string, string> | null;
  setErrorMess: React.Dispatch<
    React.SetStateAction<Record<string, string> | null>
  >;
  fieldValue: T;
  setfieldValue: React.Dispatch<React.SetStateAction<T>>;
  handleNext: () => void;
  name: string;
  htmlFor: string;
  id: string;
  label: string;
  options: string[] | readonly string[];
  autoFocus: boolean;
  required: boolean;
  errorKey: string;
  height?: string;
}
export default function Input2<T extends string | number | null>({
  errorMess,
  setErrorMess,
  fieldValue,
  setfieldValue,
  handleNext,
  name,
  htmlFor,
  id,
  label,
  options,
  autoFocus,
  required,
  errorKey,
  height,
}: compoProps<T>) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [inputField, setInputField] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<T>(fieldValue);
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
      <div className="relative group flex flex-col justify-center-safe cursor-text">
        <div
          className={`absolute left-3 ${inputField ? "-top-2 bg-bgprimary text-xs whitespace-nowrap" : "bg-transparent whitespace-normal text-base"} ${active ? "text-border" : "text-txlight"} cursor-text  px-1 transition-all ${required && `after:content-['*'] after:pl-1 after:text-red-500`} `}
        >
          {label}
        </div>

        <div
          ref={inputRef}
          tabIndex={0}
          className={`border-2 ${errorMess && errorMess[errorKey] ? "border-red-500" : "border-txlight"} outline-none focus:border-border p-4 rounded-sm w-full transition-all`}
          id={id}
          autoFocus={autoFocus}
          onFocus={handleInputMode}
          onBlur={handleInputMode}
        >
          <div className="flex flex-nowrap items-center">
            {selected ? (
              <p className="w-full overflow-hidden wrap-break-word line-clamp-1">
                {selected}
              </p>
            ) : (
              <p className="opacity-0 w-full overflow-hidden">{label}</p>
            )}
            <mediaList.FaCaretDown
              className={`${active ? "rotate-180" : "rotate-0"} cursor-pointer`}
            />
          </div>
        </div>
        {active && (
          <ol
            style={{ maxHeight: `${height ? height : 150}px` }}
            className={`absolute left-0 top-full z-10 overflow-y-auto bg-bgsecondary rounded-md min-w-full noscrollbar`}
          >
            {options.map((item, index) => (
              <li
                className="py-2 px-4 hover:bg-borderhover cursor-pointer"
                key={`${name}/option/${index}`}
                onMouseOver={() => {
                  const parsedValue =
                    typeof fieldValue === "number" ? Number(item) : item;
                  setSelected(parsedValue as unknown as T);
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
              >
                {item}
              </li>
            ))}
          </ol>
        )}
      </div>
      {errorMess && errorMess[errorKey] && (
        <small className="text-red-500 flex mt-1 gap-2 items-center">
          <Info color="red" size={15} />
          {errorMess[errorKey]}
        </small>
      )}
    </div>
  );
}
