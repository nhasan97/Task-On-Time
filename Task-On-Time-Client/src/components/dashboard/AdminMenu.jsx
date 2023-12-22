import SIdebarMenuItem from "./SIdebarMenuItem";
import "./Sidebar.css";

const AdminMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      {/* <SIdebarMenuItem
        icon={<i className="fa-solid fa-square-poll-vertical"></i>}
        menuText="Surveys"
        route="/dashboard/manage-surveys"
      ></SIdebarMenuItem> */}

      <SIdebarMenuItem
        icon={<i className="fa-solid fa-users"></i>}
        menuText="Users"
        route="/dashboard/manage-users"
      ></SIdebarMenuItem>

      {/* <SIdebarMenuItem
        icon={<i className="fa-solid fa-money-bill"></i>}
        menuText="Payments"
        route="/dashboard/payments"
      ></SIdebarMenuItem> */}

      <SIdebarMenuItem
        icon={<i className="fa-solid fa-arrow-left"></i>}
        menuText="Back to Site"
        route="/"
      ></SIdebarMenuItem>
    </div>
  );
};

export default AdminMenu;
