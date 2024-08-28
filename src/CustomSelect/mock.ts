import { generateId } from "src/lib";

import type { UserInfo, UserId } from "./types";

const POSITIONS = [
  "Разработчик",
  "Тестировщик",
  "Менеджер проекта",
  "Юрист",
  "Маркетолог",
];
const AVATARS = ["/avatars/1.png", "/avatars/2.png", "/avatars/3.png"];

export const createUser = async (
  name: string
): Promise<{ value: UserId; data: UserInfo }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const value = generateId();
      resolve({
        value: value.toString(),
        data: {
          name,
          position: POSITIONS[value % POSITIONS.length],
          avatarUrl: AVATARS[value % AVATARS.length],
        },
      });
    }, 1500)
  );
};

export const MOCK_USERS = [
  {
    value: "1",
    data: {
      name: "Василий Петров",
      position: "Разработчик",
      avatarUrl: "/avatars/1.png",
    },
  },
  {
    value: "11",
    disabled: true,
    data: {
      name: "Петр Запретный",
      position: "Охранник",
      avatarUrl: "/avatars/3.png",
    },
  },
  {
    value: "2",
    data: {
      name: "Григорий Иванов",
      position: "Тестировщик",
      avatarUrl: "/avatars/2.png",
    },
  },
  {
    value: "3",
    data: {
      name: "Сергей Сидоров",
      position: "Менеджер проекта",
      avatarUrl: "/avatars/3.png",
    },
  },
  {
    value: "4",
    data: {
      name: "Василий Петров",
      position: "Разработчик",
      avatarUrl: "/avatars/1.png",
    },
  },
  {
    value: "5",
    data: {
      name: "Григорий Иванов",
      position: "Тестировщик",
      avatarUrl: "/avatars/2.png",
    },
  },
  {
    value: "6",
    data: {
      name: "Сергей Сидоров",
      position: "Менеджер проекта",
      avatarUrl: "/avatars/3.png",
    },
  },
  {
    value: "7",
    data: {
      name: "Василий Петров",
      position: "Разработчик",
      avatarUrl: "/avatars/1.png",
    },
  },
  {
    value: "8",
    data: {
      name: "Григорий Иванов",
      position: "Тестировщик",
      avatarUrl: "/avatars/2.png",
    },
  },
  {
    value: "9",
    data: {
      name: "Сергей Сидоров",
      position: "Менеджер проекта",
      avatarUrl: "/avatars/3.png",
    },
  },
];
