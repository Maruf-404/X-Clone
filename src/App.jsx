import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import FirstPage from "./views/Firstpage/FirstPage";
import PageNotFound from "./views/PageNotFound/PageNotFound";
import { Suspense, lazy } from "react";
import ProfileSkeleton from "./components/Skeleton/ProfileSkeleton";
import CardSkeleton from "./components/Skeleton/CardSkeleton";
import CommentSkeleton from "./components/Skeleton/CommentSkeleton";

const Feed = lazy(() => import("./components/Feed/Feed"));
const Profile = lazy(() => import("./views/Profile/Profile"));
const Post = lazy(() => import("./components/Post/Post"));
const Bookmark = lazy(() => import("./views/Bookmark/Bookmark"));
const EmailVerification = lazy(() =>
  import("./views/EmailVerification/EmailVerification")
);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route
          path="/home"
          element={
            <Layout>
              <Suspense
                fallback={
                  <div>
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                }
              >
                <Feed />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Suspense
                fallback={
                  <div>
                    <ProfileSkeleton />
                    <CardSkeleton />
                  </div>
                }
              >
                <Profile />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/verification"
          element={
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <EmailVerification />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/post/:id"
          element={
            <Layout>
              <Suspense
                fallback={
                  <div>
                    <CardSkeleton />
                    <CommentSkeleton />
                  </div>
                }
              >
                <Post />
              </Suspense>
            </Layout>
          }
        />
        <Route
          path="/bookmark"
          element={
            <Layout>
              <Suspense
                fallback={
                  <div>
                    <CardSkeleton />
                    <CardSkeleton />
                  </div>
                }
              >
                <Bookmark />
              </Suspense>
            </Layout>
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
