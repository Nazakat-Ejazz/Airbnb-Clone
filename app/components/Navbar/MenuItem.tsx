"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  Icon: React.ElementType;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, Icon }) => {
  return (
    <div
      className="px-4 py-3 hover:bg-gray-100 transition font-semibold flex items-center justify-start gap-x-3"
      onClick={onClick}
    >
      {" "}
      <Icon size={18} className="text-rose-500" />
      <p className="text-md">{label}</p>
    </div>
  );
};

export default MenuItem;
