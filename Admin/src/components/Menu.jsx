import {
  FaBox,
  FaChartBar,
  FaClipboard,
  FaClipboardList,
  FaCog,
  FaElementor,
  FaHdd,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";

const menuItems = [
  { group: 1, items: [{ icon: FaHome, label: "Home" }, { icon: FaUser, label: "Profile" }] },
  { group: 2, items: [{ icon: FaUsers, label: "Users" }, { icon: FaBox, label: "Products" }, { icon: FaClipboardList, label: "Orders" }] },
  { group: 3, items: [{ icon: FaElementor, label: "Banners" }, { icon: FaCog, label: "Settings" }, { icon: FaHdd, label: "Backups" }] },
  { group: 4, items: [{ icon: FaChartBar, label: "Charts" }, { icon: FaClipboard, label: "All Logs" }, { icon: FaSignOutAlt, label: "Logout" }] },
];

const Menu = () => {
  return (
    <div className="h-screen bg-gray-100 p-[20px] w-[350px] shadow-lg">
      <ul className="flex flex-col items-start justify-start mt-[20px] pl-[10px]">
        {menuItems.map(({ group, items }, groupIndex) => (
          <>
            {items.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center w-full text-[20px] cursor-pointer mt-[20px] px-3 py-2 rounded-md transition-colors hover:bg-green-400 hover:text-white"
              >
                <Icon className="mr-[15px] text-[#8FE388] group-hover:text-white transition-colors" />
                {label}
              </li>
            ))}
            {groupIndex < menuItems.length - 1 && (
              <hr key={`hr-${group}`} className="w-full my-[20px] border-gray-300" />
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default Menu;