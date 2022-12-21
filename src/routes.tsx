import MainDashboard from "./pages/dashboard/MainDashboard";
import Login from "./pages/auth/Login";
import ModalExample from "./pages/dashboard/ModalExample";
import User from "./pages/dashboard/User";
import Register from "./pages/auth/Register";
import CompetitionPage from "./pages/football/CompetitionPage";
import MatchesPage from "./pages/football/MatchesPage";
import { type } from "@testing-library/user-event/dist/type";
import TeamPage from "./pages/football/TeamPage";

export const AdminRoutes = [
  {
    name_var: "Dashboard",
    url_var: "",
    icon_var: "ri-home-line",
  },
  {
    name_var: "Modal Example",
    url_var: "modal-example",
    icon_var: "ri-home-line",
  },
  // {
  //     name_var: 'Project Management',
  //     url_var: 'project-management',
  //     icon_var: 'ri-home-line',
  //     children: [
  //         {
  //             name_var: 'Project',
  //             url_var : "project-management-project",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'Lahan',
  //             url_var : "project-management-lahan",
  //             icon_var: 'ri-home-line',
  //         }
  //     ]
  // },
  // {
  //     name_var: 'Report',
  //     url_var: 'report',
  //     icon_var: 'ri-home-line',
  //     children: [
  //         {
  //             name_var: 'Harian',
  //             url_var : "report-daily",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'Mingguan',
  //             url_var : "report-weekly",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'Bulanan',
  //             url_var : "report-monthly",
  //             icon_var: 'ri-home-line',
  //         }
  //     ]
  // },
  // {
  //     name_var: 'User Management',
  //     url_var: 'user-management',
  //     icon_var: 'ri-home-line',
  //     children: [
  //         {
  //             name_var: 'User',
  //             url_var : "user-management-user",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'User Group',
  //             url_var : "user-management-user-group",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'Menu',
  //             url_var : "user-management-menu",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'Menu Action',
  //             url_var : "user-management-menu-action",
  //             icon_var: 'ri-home-line',
  //         },
  //         {
  //             name_var: 'Privileges',
  //             url_var : "user-management-privileges",
  //             icon_var: 'ri-home-line',
  //         }
  //     ]
  // },
  // {
  //     name_var: 'Profile',
  //     url_var: 'profile',
  //     icon_var: 'ri-home-line',
  //     component: <User />
  // }
];

export const UserRoutes = [
  {
    name_var: "Dashboard",
    url_var: "",
    icon_var: "ri-home-line",
  },
  {
    name_var: "Probe Management",
    url_var: "probe-management",
    icon_var: "ri-home-line",
    children: [
      {
        name_var: "Control",
        url_var: "probe-management-control",
        icon_var: "ri-home-line",
      },
    ],
  },
  {
    name_var: "Profile",
    url_var: "profile",
    icon_var: "ri-home-line",
  },
];

export type IPathNameChild = {
  competitionCode?: string;
  idTeam?: string;
};

export const dashboardRoutes = [
  {
    path: "",
    component: <MainDashboard />,
  },
  {
    path: "modal-example",
    component: <ModalExample />,
  },
  {
    path: ":competitionCode",
    component: <CompetitionPage />,
  },
  {
    path: ":competitionCode/matches/:idTeam",
    component: <MatchesPage />,
  },
  {
    path: ":competitionCode/team/:idTeam",
    component: <TeamPage />,
  },
  {
    path: "profile",
    component: <User />,
  },
  {
    path: "report-daily",
    component: <MainDashboard />,
  },
  {
    path: "report-weekly",
    component: <MainDashboard />,
  },
  {
    path: "report-monthly",
    component: <MainDashboard />,
  },
  {
    path: "user-management-user",
    component: <User />,
  },
  {
    path: "user-management-usergroup",
    component: <User />,
  },
  {
    path: "user-management-menu",
    component: <User />,
  },
  {
    path: "user-management-menu-action",
    component: <User />,
  },
  {
    path: "user-management-privileges",
    component: <User />,
  },
  // USER ROUTE
];

export const AuthRoutes = [
  {
    path: "sign-in",
    component: <Login />,
  },
  {
    path: "sign-up",
    component: <Register />,
  },
  // {
  //     path: 'otp-validate',
  //     component: <OtpPage />
  // },
];
