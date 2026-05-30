import { NextFunction, Request, Response } from "express";

const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    firstname,
    middlename,
    lastname,
    gender,
    dob,
    email,
    password,
    cnfPassword,
  } = req.body;
  const nameRegex = /^[a-zA-Z]+$/;

  const sendError = (error: string, type: string) => {
    console.error(error);
    return res.status(422).json({ success: false, errors: { [type]: error } });
  };

  if (password !== cnfPassword) {
    return sendError("Passwords do not match", "Confirm_Password");
  }

  if (!firstname || firstname.length < 2 || !nameRegex.test(firstname)) {
    return sendError(
      "Invalid First Name (Min 2 chars, alphabets only)",
      "First_Name",
    );
  }
  if (middlename && (middlename.length < 2 || !nameRegex.test(middlename))) {
    return sendError(
      "Invalid Middle Name (Min 2 chars, alphabets only)",
      "First_Name",
    );
  }
  if (!lastname || lastname.length < 2 || !nameRegex.test(lastname)) {
    return sendError(
      "Invalid Last Name (Min 2 chars, alphabets only)",
      "First_Name",
    );
  }

  const validateInput = (type: string, value: any) => {
    const patterns = {
      password:
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-])[^\s]{8,}$/,
      name: /^[a-zA-Z]+$/,
      email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      dob: /^\d{2}-\d{2}-\d{4}$/,
      mobile: /^\d{10}$/,
    };

    switch (type) {
      case "password":
        if (!value) return sendError("Password is required.", "Password");
        if (/\s/.test(value))
          return sendError("Password cannot contain spaces.", "Password");
        if (!/(?=.*[A-Z])/.test(value))
          return sendError(
            "Password needs at least one capital letter.",
            "Password",
          );
        if (!/(?=.*\d)/.test(value))
          return sendError("Password needs at least one number.", "Password");
        if (!/(?=.*[!@#$%^&*()_+])/.test(value))
          return sendError("Password needs at least one symbol.", "Password");
        if (value.length < 8)
          return sendError(
            "Password must be at least 8 characters long.",
            "Password",
          );
        break;

      case "email":
        if (!value) return sendError("Email is required.", "Email");
        if (!patterns.email.test(value))
          return sendError("Please enter a valid email address.", "Email");
        break;

      case "gender":
        const accept = ["male", "female", "other"];
        if (!value || !accept.includes(value.toLowerCase()))
          return sendError("Invalid gender", "Gender");
        break;

      case "dob":
        if (!value || !patterns.dob.test(value))
          return sendError("Invalid format.", "DOB_Month");
        const [day, month, year] = value.split("-").map(Number);
        if (month < 1 || month > 12)
          return sendError("Invalid month", "DOB_Month");
        if (day < 1 || day > 31) return sendError("Invalid date", "DOB_Date");
        const currentYear = new Date().getFullYear();
        if (year > currentYear) return sendError("Invalid Year", "DOB_Year");
        if (year < currentYear - 100)
          return sendError("Invalid Year", "DOB_Year");
        break;

      case "mobile":
        const str = String(value || "");
        if (str.length !== 10 || !/^[0-9]+$/.test(str))
          return sendError(
            "Mobile number must be exactly 10 digits.",
            "Mobile",
          );
        break;
    }
    return null;
  };

  if (validateInput("email", email)) return;
  if (validateInput("password", password)) return;
  if (validateInput("gender", gender)) return;
  if (validateInput("dob", dob)) return;
  // if (validateInput("mobile", mobileno)) return;

  console.log("Registration Input Validation done");
  next();
};

export default registerValidation;
