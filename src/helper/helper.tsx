import female01 from "@assets/avatars/female01.png";
import female02 from "@assets/avatars/female02.png";
import female03 from "@assets/avatars/female03.png";
import female04 from "@assets/avatars/female04.png";
import female05 from "@assets/avatars/female05.png";
import female06 from "@assets/avatars/female06.png";
import female07 from "@assets/avatars/female07.png";
import female08 from "@assets/avatars/female08.png";
import male01 from "@assets/avatars/male01.png";
import male02 from "@assets/avatars/male02.png";
import male03 from "@assets/avatars/male03.png";
import male04 from "@assets/avatars/male04.png";
import male05 from "@assets/avatars/male05.png";
import male06 from "@assets/avatars/male06.png";
import male07 from "@assets/avatars/male07.png";

export const avatarRender = (avatar: string) => {
  const female = "female";
  const male = "male";

  if (avatar.startsWith(female)) {
    switch (avatar) {
      case female + "01":
        return female01;
      case female + "02":
        return female02;
      case female + "03":
        return female03;
      case female + "04":
        return female04;
      case female + "05":
        return female05;
      case female + "06":
        return female06;
      case female + "07":
        return female07;
      case female + "08":
        return female08;
      default:
        break;
    }
  } else if (avatar.startsWith(male)) {
    switch (avatar) {
      case male + "01":
        return male01;
      case male + "02":
        return male02;
      case male + "03":
        return male03;
      case male + "04":
        return male04;
      case male + "05":
        return male05;
      case male + "06":
        return male06;
      case male + "07":
        return male07;
      default:
        break;
    }
  }
};

export const timesteampConverter = (timesteamp: number) => {
  const datetime = new Date(timesteamp * 1000);

  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
  } as Intl.DateTimeFormatOptions;
  const formattedDate = datetime.toLocaleDateString("en-US", options);

  return formattedDate;
};

export const timesteampConvertertotime = (timesteamp: number) => {
  const datetime = new Date(timesteamp * 1000);
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  } as Intl.DateTimeFormatOptions;
  const formattedDate = datetime.toLocaleDateString("en-US", options);

  return formattedDate;
};
