import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./types";

export const getDashboardBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "لوحة التحكم",
  },
];

export const getCreateMeetingBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "لوحة التحكم",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "إنشاء اجتماع",
  },
];

export const getOneOnOneMeetingBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "لوحة التحكم",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "إنشاء اجتماع",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "إنشاء اجتماع وجها لوجه ",
  },
];

export const getVideoConferenceBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "لوحة التحكم",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "إنشاء اجتماع    ",
    href: "#",
    onClick: () => {
      navigate("/create");
    },
  },
  {
    text: "إنشاء اجتماع جماعي    ",
  },
];

export const getMyMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text: "لوحة التحكم",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "اجتماعاتي",
  },
];

export const getMeetingsBreadCrumbs = (
  navigate: NavigateFunction
): Array<BreadCrumbsType> => [
  {
    text:"لوحة التحكم",
    href: "#",
    onClick: () => {
      navigate("/");
    },
  },
  {
    text: "اجتماعات",
  },
];
