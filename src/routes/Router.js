import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../layouts/layout";
import LoginPage from "../pages/LoginPage";
import RejisterPage from "../pages/RejisterPage";
import PostDetailPage from "../pages/PostDetailPage";
import TagPage from "../pages/TagPage";
import ProfilePage from "../pages/ProfilePage";
import CreatePostPage from "../pages/CreatePostPage";
import EditProfilePage from "../pages/EditProfilePage";
import AdminPage from "../pages/AdminPage";
import RedirectAdmin from "../redirect/RedirectAdmin";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/postDetailPage/:postId", element: <PostDetailPage /> },
      { path: "/tagPage", element: <TagPage /> },
      {
        path: "/profilePage",
        element: <ProfilePage />
      },

      { path: "/createPostPage", element: <CreatePostPage /> },
      { path: "/editProfilePage", element: <EditProfilePage /> },
      {
        path: "/adminPage",
        element: (
          <RedirectAdmin>
            <AdminPage />
          </RedirectAdmin>
        )
      }
    ]
  },

  { path: "/loginPage", element: <LoginPage /> },
  { path: "/rejisterPage", element: <RejisterPage /> }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
