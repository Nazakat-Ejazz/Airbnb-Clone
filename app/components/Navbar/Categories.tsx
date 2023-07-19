"use client";

import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { IoDiamond } from "react-icons/io5";
import {
  GiWindmill,
  GiIsland,
  GiBoatFishing,
  GiCastle,
  GiForestCamp,
  GiCaveEntrance,
  GiCactus,
  GiBarn,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { BsSnow } from "react-icons/bs";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },

  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },

  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },

  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is close to mountains!",
  },

  {
    label: "Pools",
    icon: TbPool,
    description: "This property has many pools!",
  },

  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an Island!",
  },

  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },

  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has camping activities!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is in the streets!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },

  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
];

function Categories() {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathname = usePathname();

  const isMain = pathname === "/";

  if (!isMain) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((cat) => (
          <CategoryBox
            key={cat.label}
            label={cat.label}
            selected={category === cat.label}
            icon={cat.icon}
          />
        ))}
      </div>
    </Container>
  );
}

export default Categories;
