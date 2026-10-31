
import Header from "@/user/layouts/Header";
import { Outlet } from "react-router-dom";

const userLayout = () => {
  return (
    <div className="">
      <Header />
      <Outlet />
    </div>
  );
};

export default userLayout;
