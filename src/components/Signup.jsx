import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import * as Yup from "yup";
import useFetch from "../hooks/use-fetch";
import { signup } from "../db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../context";

const Signup = () => {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, error, loading, fn: fnSignup } = useFetch(signup, formData);
  const { fetchUser } = UrlState();

  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      fetchUser();
    }
  }, [data, error]);

  const handleSignup = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name:Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        profile_pic:Yup.mixed().required("Profile picture is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignup();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create your account if u haven't already</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <label className="text-sm">Name </label>
          <Input
            name="name"
            type="text"
            placeholder="username"
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
        <div className="space-y-1">
          <label className="text-sm">Email </label>
          <Input
            name="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <label className="text-sm">Password </label>
          <Input
            name="password"
            type="password"
            placeholder="*******"
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <label className="text-sm">Profile Pic </label>
          <Input
            name="profile_pic"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignup}>
          {loading ? <BeatLoader size={10} /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
